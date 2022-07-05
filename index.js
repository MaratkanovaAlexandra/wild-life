const html = document.querySelector('html');
const openBtn = document.querySelector('[data-open-btn]');
const submitBtn = document.querySelector('[data-submit-btn]');
const popUp = document.querySelector('#popup');
const userName = document.querySelector('#name');
const amount = document.querySelector('#amount');
const comment = document.querySelector('#comment');

const togglePopUpAnimation = () => 
    popUp.style.animation = `fade-${popUp.open? 'out' : 'in' } 0.2s forwards`;

const openPopUp = () => {
    const top = html.scrollTop;
    html.classList.toggle('stop-scroll');
    html.style.top = -top + 'px';
    togglePopUpAnimation();
    popUp.open = !popUp.open;
}

const closePopUp = () => {
    togglePopUpAnimation();
    const top = +(html.style.top.slice(1, -2));
    html.style.scrollBehavior = 'auto';
    setTimeout(() => {
        popUp.open = !popUp.open;
        html.classList.toggle('stop-scroll');
        html.scrollTop = top;
        html.style.scrollBehavior = 'smooth';
        
        userName.value = '';
        amount.value = '';
        comment.value = '';
    }, 200);
};

openBtn.addEventListener('click', openPopUp);
submitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    closePopUp();
});
popUp.addEventListener('click', (e) => {
    if (e.target === popUp) closePopUp()
});

amount.addEventListener('input', () => {
    if(amount.value.length === 0) return;
    amount.value = amount.value.replace('$', '');
    if(!/^\d+$/.test(amount.value)) return amount.value = amount.value.slice(0, -1);
    amount.value += '$';
    amount.selectionEnd = amount.value.length - 1;
});