document.addEventListener('DOMContentLoaded', () => {
    const viewMoreButton = document.querySelector('.gg-arrow-down-o');
    const reviewsContainer = document.querySelector('.reviews-container');
    const arrowBox = document.querySelector('.arrow-box');
    const userProfile = document.querySelector('.user-profile');
    let reviewsVisible = false;
  
    viewMoreButton.addEventListener('click', () => {
      if (!reviewsVisible) {
        reviewsContainer.classList.add('show-more-reviews');
        arrowBox.classList.add('up-arrow');
        reviewsVisible = true;
      } else {
        reviewsContainer.classList.remove('show-more-reviews');
        arrowBox.classList.remove('up-arrow');
        reviewsVisible = false;
      }
    });
  
    document.querySelectorAll('.review-box').forEach(reviewBox => {
      reviewBox.addEventListener('click', () => {
        const profilePic = userProfile.querySelector('.profile-pic');
        const reviewPic = reviewBox.querySelector('.profile-pic');
        profilePic.style.backgroundImage = reviewPic.style.backgroundImage || 'url("default-profile-pic.jpg")';
        userProfile.querySelector('.username').textContent = reviewBox.querySelector('.username').textContent;
        userProfile.querySelector('.review-text').textContent = reviewBox.querySelector('.review-text').textContent;
      });
    });
  });