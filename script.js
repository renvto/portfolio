let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const prevButton = document.getElementById('prev-button');
const nextButton = document.getElementById('next-button');
let isAnimating = false;
let startX;
let isDragging = false;

function showSlide(index, initial = false) {
    isAnimating = true;
    document.body.classList.add('no-pointer-events');

    slides.forEach((slide, i) => {
        if (initial) {
            slide.style.transition = 'none';
        } else {
            slide.style.transition = 'transform 0.5s ease';
        }
        slide.style.transform = `translateX(${(i - index) * 100}%)`;
    });

    setTimeout(() => {
        isAnimating = false;
        document.body.classList.remove('no-pointer-events');
    }, initial ? 0 : 500);

    if (index === 0) {
        prevButton.classList.remove('show');
        prevButton.classList.add('hide');
    } else {
        prevButton.classList.remove('hide');
        prevButton.classList.add('show');
    }

    if (index === slides.length - 1) {
        nextButton.classList.remove('show');
        nextButton.classList.add('hide');
    } else {
        nextButton.classList.remove('hide');
        nextButton.classList.add('show');
    }
}

function navigate(direction) {
    if (isAnimating) return;

    currentSlide += direction;
    if (currentSlide < 0) currentSlide = 0;
    if (currentSlide > slides.length - 1) currentSlide = slides.length - 1;
    showSlide(currentSlide);
}

function handleKeydown(event) {
    if (isAnimating) return;

    if (event.key === 'ArrowLeft') {
        navigate(-1);
    } else if (event.key === 'ArrowRight') {
        navigate(1);
    } else if (event.key === 'ArrowUp') {
        navigate(1);
    }
    else if (event.key === 'ArrowDown') {
        navigate(-1);
    }
    
}

function handleMouseDown(event) {
    startX = event.pageX;
    isDragging = true;
}

function handleMouseMove(event) {
    if (!isDragging) return;

    const currentX = event.pageX;
    const diffX = startX - currentX;

    if (Math.abs(diffX) > 50) {
        navigate(diffX > 0 ? 1 : -1);
        startX = currentX;
    }
}

function handleMouseUp() {
    isDragging = false;
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(function () {
        const tooltip = document.getElementById('tooltip');
        tooltip.classList.remove('hide');
        tooltip.classList.add('show');
        setTimeout(() => {
            tooltip.classList.remove('show');
            tooltip.classList.add('hide');
        }, 1750);
    });
}

document.addEventListener('keydown', handleKeydown);
document.addEventListener('mousedown', handleMouseDown);
document.addEventListener('mousemove', handleMouseMove);
document.addEventListener('mouseup', handleMouseUp);

showSlide(currentSlide, true);
