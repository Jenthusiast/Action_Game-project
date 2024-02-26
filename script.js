// Now to code for when to display game over 
// to jab dono collide karenge to ham display karenge game over warna nhi. simple :)
score = 0;
cross = true;
// agar mai keyboard ka koi button daba rha hu to mai kis tarah us event ko trigger kru-
// to hamar epaas javascript ka ek method hai
audio=new Audio('Run-Amok(chosic.com).mp3');
audiogo= new Audio('gameover.mp3');
setTimeout(()=>{
   audio.play()
},1000);
document.onkeydown = function (e) {
    console.log("key code is:", e.keyCode)
    if (e.keyCode == 38) {
        dino = document.querySelector('.dino');
        dino.classList.add('animateDino');
        setTimeout(() => {
            dino.classList.remove('animateDino')
        }, 700);
    }

    if (e.keyCode == 39) {
        dino = document.querySelector('.dino');
        dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
        dino.style.left = dinoX + 112 + "px";
    }
    if (e.keyCode == 37) {
        dino = document.querySelector('.dino');
        dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
        dino.style.left = (dinoX - 112) + "px";
    }
}
// setInterval ka matlab hai ki aap os kaam ko karte rahe is kaam ko kuch iterval tak maan lo mai kuchh krti rahu 100ms tak.
// to ye ye check krat rahega takravat ko.ki kya aap apne obastacle se trakra rahe hai ki nahi 
setInterval(() => {
    dino = document.querySelector('.dino');
    gameOver = document.querySelector('.gameOver');
    obstacle = document.querySelector('.obstacle');
    // as ham logo ne kuch left value dino ko bhi di hai kuchh left value dragon ko bhi di hAI TO to un dono spaces ka difference3  kare agar to hame pata chal jayega ki wo dono collide kr rahe hai ki nhi 
    // lkn dino jab hawa me hoga tab bhi to don o ki x value same ho dsakti hAI TO ham kya logicc lagayenge ki agar in dono ki x value itni proximity me na aaye or y me bhi kuchh proxim ity m e na aaye  to is tarah se ham  in dono k collissi0on lko detect kmr sakte hai 
    dx = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
    // so here we are trying to get the current left value as we are changing the left value of the obstacle and dino by using animation so in dx we'll get the current value of left 
    // similsarly, in dy we'll get the current value of value of top.to yaha pr ye top se jo distance hai dino ki or jo top se window ki wo bhi ye le lega.  
    dy = parseInt(window.getComputedStyle(dino, null).getPropertyValue('top'));
    ox =parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('left'));
    oy = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('top'));
    // yaha pr value pixel("px")me aa rhi thi to hamne ise integer pe laane k liye parseInt ka use kiya hai. 
    offsetX = Math.abs(dx - ox);
    offsetY = Math.abs(dy - oy);
    console.log(offsetX, offsetY)
    // to aqb ham yaha pr kya krne wale hai ki ek min. duri decide krke offset me dal denge or us value se agar nazdeek dino aaya obstacle k to dino mar jayega.To dino mko dur rehna obstacle se
    if (offsetX < 73 && offsetY < 52) {
        gameOver.style.visibility = 'visible';
        obstacle.classList.remove('obsatcleAni');
        audiogo.play();
       setTimeout(()=>{
audiogo.pause();
       },1000);
    }
    else if (offsetX < 145 && cross) {
        score += 1;
        updateScore(score);
        cross = false;
        setTimeout(() => {
            cross = true;
        }, 1000);
        // yaha pr ab ham kya chahte hai ki jaise jaise game ki timing badhe waise waise obstacle(dragon) ki speed bhi badhe.or wahi ham niche kr rahe hai. by decreasing the value of ANIMATION DURATION taki obstacle tez cahl sake.
        setTimeout(()=>{
        aniDur= parseFloat(window.getComputedStyle(obstacle, null).getPropertyValue('animation-duration'));
        newDur=aniDur-0.5;
        obstacle.style.animationDuration=newDur+'s';
        // to yaha pr duration hamari seconds me ho jaye kyon ki agar 4 hai to 4s krke likh kr accept ho q agar aapko pata ho to ham animation ki duration ko aise likte hai--> animation:obstacleAni 5s linear infinite; to string bana kr set krnas padega IS PROPERTY KO
    },500);
        // or yaha pr ham animation duration ki value exact lena chahte hai to ham parseInt nahi parseFloat lenge  
    }
    // agar cross true hai tab hi score badhega 
    // to cross ko  false kr dene se score ek bar hi badhega but ham kya chaturai karenge ki setTime out k andar cross ko true kr denge after 1 sec. aisa krne se kya hoga ki ek sec k b aad update hone layak ban jayega wo or dino cross kr chuka hoga guys :) 
}, 10);
function updateScore(score) {
    scoreCont.innerHTML = "Your Score:" + score
}