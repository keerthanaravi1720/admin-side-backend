
const express = require('express');
const { PrismaClient } = require('@prisma/client');
const cors = require('cors');
const { id } = require('date-fns/locale');

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

// // Create a new post
app.post('/posts', async (req, res) => {
  const {
    title,
    startDate,
    endDate,
    siteLink,
    hasTimeLimit,
    timeLimitValue,
    description,
    remarks,
    needProof,
    siteLinkHidden,
  } = req.body;

  // Set default values for checkboxes if they're not provided in the request
  const finalNeedProof = typeof needProof === 'boolean' ? needProof : false;
  const finalSiteLinkHidden = typeof siteLinkHidden === 'boolean' ? siteLinkHidden : false;
  const finalHasTimeLimit = typeof hasTimeLimit === 'boolean' ? hasTimeLimit : false;

  try {
    const isoStartDate = toISODate(startDate);
    const isoEndDate = toISODate(endDate);

    console.log('isoStartDate:', isoStartDate);
console.log('isoEndDate:', isoEndDate);

    const timeLimit = finalHasTimeLimit ? timeLimitValue : 'No Time Limit';

    const post = await prisma.post.create({
      data: {
        title,
        startDate: new Date(isoStartDate),
        endDate: new Date(isoEndDate),
        siteLink,
        hasTimeLimit: finalHasTimeLimit,
        timeLimitValue,
        description,
        remarks,
        needProof: finalNeedProof,
        siteLinkHidden: finalSiteLinkHidden,
      },
    });

    post.startDate = formatDate(post.startDate);
    post.endDate = formatDate(post.endDate);

    res.status(200).json({ message: 'Post created successfully', post });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while creating the post' });
  }
});






// Function to format the date to "dd/mm/yyyy" format
function formatDate(dateString) {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

// Function to convert the formatted date to ISO format
function toISODate(dateString) {
  const [day, month, year] = dateString.split('/');
  return `${year}-${month}-${day}`;
}


// update title//
// app.put('/update/:id', async (req, res) => {
//   const postId = parseInt(req.params.id);
//   const { title } = req.body;

//   try {
//     const updatedPost = await prisma.post.update({
//       where: { id: postId },
//       data: {
//         title, // Update the title field only
//       },
//     });

//     res.status(200).json({ message: 'Post title updated successfully', post: updatedPost });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'An error occurred while updating the post title' });
//   }
// });




// specific id
app.get('/posts/:id', async (req, res) => {
  const postId = parseInt(req.params.id);

  try {
    const post = await prisma.post.findUnique({
      where: { id: postId },
    });

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    post.startDate = formatDate(post.startDate);
    post.endDate = formatDate(post.endDate);
    post.hasTimeLimit= post.hasTimeLimit ? 'Yes' : 'No',
    post.needProof= post.needProof ? 'Yes' : 'No',
    post.siteLinkHidden= post.siteLinkHidden ? 'Yes' : 'No',

    res.status(200).json({ post });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching the post' });
  }
});



// Update an Id
app.put('/posts/:id', async (req, res) => {
  const postId = parseInt(req.params.id);
  console.log('Received postId:', postId);
  const {
    title,
    startDate,
    endDate,
    siteLink,
    hasTimeLimit,
    timeLimitValue,
    description,
    remarks,
    needProof,
    siteLinkHidden,
  } = req.body;


 
  const finalNeedProof = typeof needProof === 'boolean' ? needProof : false;
  const finalSiteLinkHidden = typeof siteLinkHidden === 'boolean' ? siteLinkHidden : false;
  const finalHasTimeLimit = typeof hasTimeLimit === 'boolean' ? hasTimeLimit : false;



  try {
    const isoStartDate = toISODate(startDate);
    const isoEndDate = toISODate(endDate);

    const timeLimit = finalHasTimeLimit ? timeLimitValue : 'No Time Limit';

    const updatedPost = await prisma.post.update({
      where: { id: postId },
      data: {
        title,
        startDate: new Date(isoStartDate),
        endDate: new Date(isoEndDate),
        siteLink,
        hasTimeLimit: finalHasTimeLimit,
        timeLimitValue,
        description,
        remarks,
        needProof: finalNeedProof,
        siteLinkHidden: finalSiteLinkHidden,
      },
    });

    updatedPost.startDate = formatDate(updatedPost.startDate);
    updatedPost.endDate = formatDate(updatedPost.endDate);

    res.status(200).json({ message: 'Post updated successfully', post: updatedPost });
    console.log(updatedPost)
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while updating the post' });
  }
});




// // search Function
// app.get('/posts/:title', async (req, res) => {
//   const searchTitle = req.params.title;

//   try {
//     const post = await prisma.post.findFirst({
//       where: {
//         title: searchTitle,
       
//       },
//     });

//     if (!post) {
//       return res.status(404).json({ message: 'Post not found' });
//     }

//     post.startDate = formatDate(post.startDate);
//     post.endDate = formatDate(post.endDate);

//     res.json({ message: 'Post found', post });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'An error occurred while searching for the post' });
//   }
// });





// Search for posts by title
app.get('/posts/search/:title', async (req, res) => {
  const { title } = req.params;

  try {
    const posts = await prisma.post.findMany({
      where: {
        title: {
          contains: title,
        },
      },
    });

    res.status(200).json({ message: 'Search results', posts, });
   
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while searching for posts' });
  }
});




// get all post Id
app.get('/posts', async (req, res) => {
  try {
    const posts = await prisma.post.findMany();

    // Convert the fetched post's dates back to "dd/mm/yyyy" format
    const formattedPosts = posts.map((post) => ({
      ...post,
      startDate: formatDate(post.startDate),
      endDate: formatDate(post.endDate),
      // hasTimeLimit: post.timeLimit ?'Yes' : 'No',
      hasTimeLimit: post.hasTimeLimit ? 'Yes' : 'No',
      needProof: post.needProof ? 'Yes' : 'No',
      siteLinkHidden: post.siteLinkHidden ? 'Yes' : 'No',
    }));

    res.json(formattedPosts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching posts' });
  }
});






// Delete a post by ID
app.delete('/posts/:id', async (req, res) => {
  const postId = parseInt(req.params.id);

  try {
    const deletedPost = await prisma.post.delete({
      where: { id: postId },
    });

    res.json({ message: 'Post deleted successfully', post: deletedPost });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while deleting the post' });
  }
});



const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
