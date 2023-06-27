const db = require("../../models/index");

const getUserById = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = "";
      if (userId) {
        user = await db.users.findOne({
          where: { id: userId },
          attributes: {
            exclude: ["password"],
          },
        });
        resolve(user);
      }
    } catch (error) {
      reject(error);
    }
  });
};

const updateUserByEmail = (userUpdate) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.users.findOne({
        where: { email: userUpdate.email },
        attributes: {
          exclude: ["password"],
        },
        raw: false,
      });

      if (user) {
        user.name = userUpdate.name;
        user.phone_number = userUpdate.phone_number
          ? userUpdate.phone_number
          : user.phone_number;
        user.date_of_birth = userUpdate.date_of_birth
          ? userUpdate.date_of_birth
          : user.date_of_birth;
        await user.save();
        resolve({
          message: "Update successfully",
          user: user,
        });
      } else {
        resolve({
          message: "User not found",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

const handleCreatePost = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (data) {
        const newPost = await db.posts.create({
          title: data?.title,
          content: data?.content,
          user_id: data?.user_id,
          status: "false",
          short_description: data?.short_description,
          full_description: data?.full_description,
          num_like: 0,
          num_dislike: 0,
          topic: data?.topic,
        });

        // add img for post
        const newImg = await db.images.create({
          image_url: data.image,
        });
        await db.image_post.create(
          {
            post_id: newPost.id,
            image_id: newImg.id,
          },
          {
            fields: ["image_id", "post_id"],
          }
        );

        resolve({
          message: "Create post successfully",
          newPost,
        });
      } else {
        resolve({
          message: "Missing required parameter",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

const handleGetPost = (postId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (postId.toLowerCase() === "all") {
        const allPosts = await db.posts.findAll();
        resolve(allPosts);
      } else {
        const post = await db.posts.findOne({
          where: { id: postId },
        });

        if (!post) {
          resolve({
            message: "Post not found",
          });
        }

        const user = await db.users.findOne({
          where: { id: post.user_id },
        });

        const idImg = await db.image_post.findOne({
          where: { post_id: post.id },
          attributes: { exclude: ["id"] },
        });
        const link = await db.images.findOne({
          where: { id: idImg.image_id },
        });

        resolve({
          message: "OK",
          post,
          user,
          link,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

const handleUpdatePost = (postId, data, img) => {
  return new Promise(async (resolve, reject) => {
    try {
      const post = await db.posts.findOne({
        where: { id: postId },
        raw: false,
      });

      if (post) {
        post.title = data.title ? data.title : post.title;
        post.content = data.content ? data.content : post.content;
        post.full_description = data.full_description
          ? data.full_description
          : post.full_description;
        post.short_description = data.short_description
          ? data.short_description
          : post.short_description;
        post.topic = data.topic ? data.topic : post.topic;

        if (img) {
          const newImgPost = await db.images.create({
            image_url: img,
          });

          await db.image_post.destroy({
            where: { post_id: post.id },
          });

          await db.image_post.create(
            {
              image_id: newImgPost.id,
              post_id: post.id,
            },
            {
              fields: ["image_id", "post_id"],
            }
          );
        }

        await post.save();
        resolve({
          message: "Update successfully",
          post,
        });
      } else {
        resolve({
          message: "Post not found",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

const handleDeletePost = (postId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const post = await db.posts.findOne({
        where: { id: postId },
        raw: false,
      });

      if (post) {
        const comments = await db.comments.findAll({
          where: { post_id: Number(postId) },
        });
        if (!comments || comments.length === 0) {
          await db.image_post.destroy({
            where: { post_id: Number(postId) },
          });
          await post.destroy();
          resolve({
            message: "Delete post successfully",
          });
        } else {
          await db.comments.destroy({
            where: { post_id: Number(postId) },
          });
          await db.image_post.destroy({
            where: { post_id: Number(postId) },
          });

          await post.destroy();
          resolve({
            message: "Delete post successfully",
          });
        }
      } else {
        resolve({
          message: "Post not found",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

const handleAddQAS = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (data) {
        const newQuestion = await db.qas.create({
          question: data?.question,
          user_id: data?.user_id,
        });
        resolve({
          message: "Create question successfully",
          newQuestion,
        });
      } else {
        resolve({
          message: "Missing required parameter",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

const handleGetQuestion = (idQAS) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (idQAS.toLowerCase() === "all") {
        const allQAS = await db.qas.findAll();
        resolve(allQAS);
      } else {
        const question = await db.qas.findOne({
          where: { id: idQAS },
        });

        if (!question) {
          resolve({
            message: "Question not found",
          });
        }

        const user = await db.users.findOne({
          where: { id: question.user_id },
        });

        resolve({
          message: "OK",
          question,
          user,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

const handleAddComment = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (data) {
        const newCmt = await db.comments.create({
          post_id: data?.post_id,
          user_id: data?.user_id,
          content: data?.content,
        });
        resolve({
          message: "Create comment successfully",
          newCmt,
        });
      } else {
        resolve({
          message: "Missing required parameter",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

const handleGetCommentOfPost = (idPost) => {
  return new Promise(async (resolve, reject) => {
    try {
      const post = await db.posts.findOne({
        where: { id: Number(idPost) },
      });

      if (post) {
        const comments = await db.comments.findAll({
          where: { post_id: Number(idPost) },
        });

        if (!comments || comments.length === 0) {
          resolve({
            message: "Post doesn't have any comment",
          });
        }

        const listCmt = await Promise.all(
          comments.map(async (cmt) => {
            const user = await db.users.findOne({
              where: { id: cmt.user_id },
            });
            return { ...cmt, user };
          })
        );

        resolve({
          message: "OK",
          listCmt,
        });
      } else {
        resolve({
          message: "Post not found",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

const handleDeleteComment = (idCmt) => {
  return new Promise(async (resolve, reject) => {
    try {
      const comment = await db.comments.findOne({
        where: { id: idCmt },
        raw: false,
      });

      if (comment) {
        await comment.destroy();
        resolve({
          message: "Delete comment successfully",
        });
      } else {
        resolve({
          message: "Comment not found",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

const handleUpdateComment = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const comment = await db.comments.findOne({
        where: { id: id },
        raw: false,
      });

      if (comment) {
        comment.content = data.content ? data.content : comment.content;
        await comment.save();
        resolve({
          message: "Update successfully",
          comment,
        });
      } else {
        resolve({
          message: "Comment not found",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

const handleRateTour = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const newRate = await db.rates.create(
        {
          user_id: data?.user_id,
          tour_id: data?.tour_id,
          location_rate: data?.location_rate,
          price_rate: data?.price_rate,
          service_rate: data?.service_rate,
          infrastructure_rate: data?.infrastructure_rate,
        },
        {
          fields: [
            "user_id",
            "tour_id",
            "location_rate",
            "price_rate",
            "service_rate",
            "infrastructure_rate",
          ],
        }
      );
      resolve({
        message: "Rate tour successfully",
        newRate,
      });
    } catch (error) {
      reject(error);
    }
  });
};

const handleGetRateByTour = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const tour = await db.tours.findOne({
        where: { id: Number(id) },
      });

      if (tour) {
        const rates = await db.rates.findAll({
          where: { tour_id: Number(id) },
          attributes: { exclude: ["id"] },
        });

        if (!rates || rates.length === 0) {
          resolve({
            message: "Tour doesn't have any comment",
          });
        } else {
          let allPoint = 0;
          rates.forEach((rate) => {
            allPoint +=
              (rate.location_rate +
                rate.service_rate +
                rate.price_rate +
                rate.infrastructure_rate) /
              4;
          });

          let pointTour = allPoint / rates.length;
          resolve({
            message: "OK",
            rates,
            pointTour,
          });
        }
      } else {
        resolve({
          message: "Tour not found",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

const handleDeleteRate = (idTour, idUser) => {
  return new Promise(async (resolve, reject) => {
    try {
      const rate = await db.rates.findOne({
        where: { user_id: idUser, tour_id: idTour },
        attributes: { exclude: ["id"] },
        raw: false,
      });

      if (rate) {
        await db.rates.destroy({
          where: { user_id: idUser, tour_id: idTour },
          // limit: 1,
        });

        resolve({
          message: "Delete rate successfully",
        });
      } else {
        resolve({
          message: "Rate not found",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

const handleUpdateRate = (idUser, idTour, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const rate = await db.rates.findOne({
        where: { user_id: idUser, tour_id: idTour },
        attributes: { exclude: ["id"] },
        raw: false,
      });

      if (rate) {
        const [rowsAffected] = await db.rates.update(
          {
            location_rate: data.location_rate || db.rates.location_rate,
            price_rate: data.price_rate || db.rates.price_rate,
            service_rate: data.service_rate || db.rates.service_rate,
            infrastructure_rate:
              data.infrastructure_rate || db.rates.infrastructure_rate,
          },
          {
            where: { user_id: idUser, tour_id: idTour },
          }
        );

        if (rowsAffected > 0) {
          resolve({
            message: "Update successfully",
          });
        } else {
          resolve({
            message: "You have not changed anything",
          });
        }
      } else {
        resolve({
          message: "Rate not found",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

const handleAddFavTour = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const favTour = await db.user_favorite_tour.create(
        {
          user_id: data?.user_id,
          tour_id: data?.tour_id,
        },
        {
          fields: ["user_id", "tour_id"],
        }
      );
      resolve({
        message: "Add favorite tour successfully",
        favTour,
      });
    } catch (error) {
      reject(error);
    }
  });
};

const handleGetFavTourOfUser = (idUser) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await db.users.findOne({
        where: { id: Number(idUser) },
      });

      if (user) {
        const favTour = await db.user_favorite_tour.findAll({
          where: { user_id: Number(idUser) },
          attributes: { exclude: ["id"] },
        });

        if (!favTour || favTour.length === 0) {
          resolve({
            message: "User doesn't have any favorite tour",
          });
        } else {
          resolve({
            message: "OK",
            favTour,
          });
        }
      } else {
        resolve({
          message: "User not found",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

const handleDeleteFavTour = (idTour, idUser) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await db.users.findOne({
        where: { id: idUser },
      });

      const tour = await db.tours.findOne({
        where: { id: idTour },
      });

      if (!user || user.length === 0 || !tour || tour.length === 0) {
        resolve({
          message: "User or tour not found",
        });
      } else {
        const favTour = await db.user_favorite_tour.findOne({
          where: { user_id: idUser, tour_id: idTour },
          attributes: { exclude: ["id"] },
        });

        if (!favTour || favTour.length === 0) {
          resolve({
            message: "Favorite tour not found",
          });
        } else {
          await db.user_favorite_tour.destroy({
            where: { user_id: idUser, tour_id: idTour },
            limit: 1,
          });
          resolve({
            message: "Delete favorite tour successfully",
          });
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};

const handleBookTour = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const tourBooking = await db.user_booking_tour.create({
        user_id: data?.user_id,
        tour_id: data?.tour_id,
        arrival_day: data.arrival_day,
        arrival_time: data.arrival_time,
        price: data?.price,
        num_people: data?.num_people,
      });
      resolve({
        message: "Book tour successfully",
        tourBooking,
      });
    } catch (error) {
      reject(error);
    }
  });
};

const handleCancleTour = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const booking = await db.user_booking_tour.findOne({
        where: { id: id },
        raw: false,
      });

      if (!booking) {
        return resolve({
          message: "Booking not found",
        });
      } else {
        await booking.destroy();
        return resolve({
          message: "Cancel booking successfully",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

const handleReactPost = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const post = await db.posts.findOne({
        where: { id: data.post_id },
        raw: false,
      });

      if (!post) {
        resolve({
          message: "Post not found",
        });
      }
      if (data.action === "like") {
        post.num_like = post.num_like + 1;
        post.save();
        resolve({
          message: "Like post successfully",
          post,
        });
      } else {
        post.num_dislike = post.num_dislike + 1;
        post.save();
        resolve({
          message: "Dislike post successfully",
          post,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

const handleGetBooking = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await db.users.findOne({
        where: { id: id },
      });
      if (!user) {
        return resolve({
          message: "User not found",
        });
      }

      const listBooking = await db.user_booking_tour.findAll({
        where: { user_id: id },
      });

      if (listBooking.length === 0) {
        return resolve({
          message: "User doesn't have booked any tour",
        });
      } else {
        const listUserBooking = await Promise.all(
          listBooking.map(async (booking) => {
            const tour = await db.tours.findOne({
              where: { id: booking.tour_id },
            });
            return { tour, booking };
          })
        );
        return resolve(listUserBooking);
      }
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  getUserById,
  updateUserByEmail,
  handleCreatePost,
  handleGetPost,
  handleUpdatePost,
  handleDeletePost,
  handleAddQAS,
  handleGetQuestion,
  handleAddComment,
  handleGetCommentOfPost,
  handleDeleteComment,
  handleUpdateComment,
  handleRateTour,
  handleGetRateByTour,
  handleDeleteRate,
  handleUpdateRate,
  handleAddFavTour,
  handleGetFavTourOfUser,
  handleDeleteFavTour,
  handleBookTour,
  handleCancleTour,
  handleReactPost,
  handleGetBooking,
};
