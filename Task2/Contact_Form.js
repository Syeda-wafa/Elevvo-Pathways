document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Reset errors
    document.querySelectorAll('.error').forEach(el => {
        el.style.display = 'none';
    });
    document.querySelectorAll('input, textarea').forEach(el => {
        el.classList.remove('input-error');
    });
    
    // Get form values
    const fullName = document.getElementById('fullName').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();
    
    let isValid = true;
    
    // Validate name
    if (fullName === '') {
        document.getElementById('nameError').style.display = 'block';
        document.getElementById('fullName').classList.add('input-error');
        isValid = false;
    }
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email === '') {
        document.getElementById('emailError').style.display = 'block';
        document.getElementById('emailError').textContent = 'Please enter your email address';
        document.getElementById('email').classList.add('input-error');
        isValid = false;
    } else if (!emailRegex.test(email)) {
        document.getElementById('emailError').style.display = 'block';
        document.getElementById('emailError').textContent = 'Please enter a valid email address';
        document.getElementById('email').classList.add('input-error');
        isValid = false;
    }
    
    // Validate subject
    if (subject === '') {
        document.getElementById('subjectError').style.display = 'block';
        document.getElementById('subject').classList.add('input-error');
        isValid = false;
    }
    
    // Validate message
    if (message === '') {
        document.getElementById('messageError').style.display = 'block';
        document.getElementById('message').classList.add('input-error');
        isValid = false;
    }
    
    // If form is valid, you would typically submit it here
    if (isValid) {
        // In a real application, you would send the form data to a server
        alert('Form submitted successfully!');
        this.reset();
    }
});