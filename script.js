let prevBtn = document.getElementById('prev-btn');
let nextBtn = document.getElementById('next-btn');
let slides = document.querySelectorAll('.content');

let curr_pos = 1;
let has_transition = true; // var to keep track if slides have transotions or npt 

// for 0 based position : 
// for the ith element to be visible all elems should be translated (pos - i)*100 % along X  
// since we have set overflowX hidden and for the i-th elem to be visible it should
// have translateX as 0% , ie : (i - offset)*100 % == 0% , where offset to for i-th elt is i .  
function set_slides(offset) {
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.left = `${(i - offset) * 100}%`;
    }
};

// next 2 lines sets the initial carousel when page loads with transition. 
need_transition(true);
set_slides(curr_pos);

nextBtn.addEventListener('click', () => {
    curr_pos++;
    shift();
});

prevBtn.addEventListener('click', () => {
    curr_pos--;
    shift();
});

function shift() {
    if (has_transition == false)
        need_transition(true); // every time we shift we check if we have transition or not 

    set_slides(curr_pos);
};

// funtion for the circular dll effect . 
slides[curr_pos].addEventListener('transitionend', () => {
    if (slides[curr_pos].id == "fclone") {
        curr_pos = 1;
        need_transition(false); // remv transition to reset slide
        set_slides(curr_pos);
    }
    else if (slides[curr_pos].id == "lclone") {
        curr_pos = slides.length - 2;
        need_transition(false); // remv transition to reset slide
        set_slides(curr_pos);
    }
});

//funtion to remove / add transition effect to all slides according to the state passed 
function need_transition(state) {
    slides.forEach((slide) => {
        slide.style.transition = state == false ? "" : "all .3s ease";
    });

    has_transition = state;
};