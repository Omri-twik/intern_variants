// #########################################################
// INSTRUCTIONS
// #########################################################
//
// Customize the color settings down below and you are ready
//
// to apply an accessibility bar to your website
//
// #########################################################

let accessibilityBackgroundColor = "brown";
let accessibilityToggledOnBackgroundColor = "yellow";
let borderColor = "black";
let buttonsBackgroundColor = "white";
let buttonRowBackgroundColor = "white";
let accessibilityHeaderColor = "black";
let accessibilityTextColor = "black";
let increasedTextIndicatorColor = "green";
let decreasedTextIndicatorColor = "red";

// #########################################################
// START OF FUNCTIONALITY
// #########################################################

let accessibilityCSS = `
<style>
#accessibility-box {
  background-color: ${accessibilityBackgroundColor};
  width: 350px;
  height: 100vh;
  display: block;
  position: fixed;
  top: 0;
  left: -610px;
  z-index: 9999;
  transition: all 0.3s ease-out;
}

#block-animations-div,
.row-accessibility,
.accessibility-header-div,
.link-access-page {
  margin-bottom: 5px;
  margin-left: 5px;
  margin-right: 5px;
}

#block-animations-div,
.link-access-page {
  height: 50px;
}

#accessibility-disable-buttons-reset-all,
#accessibility-disable-animations-button {
  height: 100%;
}

.row-accessibility {
  background-color: ${buttonRowBackgroundColor};
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
}

.row-accessibility-buttons-div {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-evenly;
  height: 100%;
}

.row-accessibility-buttons {
  height: 100%;
}

.row-accessibility-buttons-container {
  margin: 5px;
  height: 100%;
}

.button-accessibility-div {
  width: 30%;
  height: 100%;
  height: 90px;
}
.button-accessibility-div, 
#block-animations-div, 
#accessibility-disable-buttons-reset-all,
.link-access-page {
  background-color: ${buttonsBackgroundColor};
}

.row-accessibility-button,
#accessibility-disable-animations-button,
#accessibility-disable-buttons-reset-all {
  width: 100%;
  height: 100%;
  background-color: white;
  border: 2px solid ${borderColor};
  
}

.row-header-accessibility {
  width: 100%;
  margin: 0;
  letter-spacing: 1px;
}

.row-accessibility-button {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  
}
.row-accessibility-button, 
#accessibility-disable-animations-button, 
#accessibility-disable-buttons-reset-all {
  background-color: rgba(0,0,0,0);

}

.row-accessibility-button,
#row-header-accessibility,
#accessibility-disable-buttons-reset-all,
#accessibility-disable-animations-button {
  font-size: 16px;
  font-weight: bold;
}

.accessibility-header-div {
  text-align: center;
  margin-top: 10px;
  margin-bottom: 10px;
  font-size: 25px;
}

.row-header-accessibility {
  font-size: inherit;
}

#accessibility-disable-buttons-reset-all {
  width: 100%;
}

#accessibility-disable-animations-button {
  width: 100%;
}

.accessibility-box-header {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-end;
}

#accessibility-box-close-button {
  margin: 5px;
  width: 100px;
  height: 50px;
  font-size: 20px;
}

.toggled-on {
  background-color: ${accessibilityToggledOnBackgroundColor} !important;
  border: 3px dashed ${borderColor} !important;
}

#bubble-accessibility-toggle-button {
  position: fixed;
  z-index: 9999999999999999;
  left: 10px;
  bottom: 10px;
}

#block-animations-div > button, 
.button-accessibility-div > button,
#accessibility-disable-buttons-reset-all {
  color: ${accessibilityTextColor};
}

.accessibility-header-div > h2 {
  color: ${accessibilityHeaderColor};
}

#increased-text-indicator {
  color: ${increasedTextIndicatorColor};
}
#decreased-text-indicator {
  color: ${decreasedTextIndicatorColor};
}
</style>
`;
let accessibilityHTML = `
<div id="accessibility-box" class="accessibility-box opened-accessibility">
<div class="accessibility-box-header">
    <button title="close" id="accessibility-box-close-button">close</button>
</div>

<div id="block-animations-div">
    <button title="block animations" id="accessibility-disable-animations-button">
        <span>block animations</span>
        <img class="accessibility-image" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAPFBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADQLyYwAAAAE3RSTlMABwoNDxAcIS84PkBBVGR7guj3cqQiVwAAAFxJREFUGNNlz9sOgCAMA9AiIioKav//Xx2XIGAfluwkSzpAoY963CCOo1xRjETn/SRFnEyuwAJ4VtkQfIEse2CFJDcbKFcNZGkhSQdRfO7xySTNZlOiD/7/soNYvHcOCRT6qv0LAAAAAElFTkSuQmCC"
            alt="block animations" />
    </button>
</div>

<div class="row-accessibility">
    <div id="contrast-block-accessibility-header-div" class="accessibility-header-div">
        <h2 class="row-header-accessibility">COLOR CONTRAST</h2>
    </div>
    <div id="accessibility-contrast-block" class="row-accessibility-buttons-container">
        <div class="row-accessibility-buttons-div">
            <div class="contrast-button-accessibility-div button-accessibility-div">
                <button class="row-accessibility-button" title="uncolored display"
                    id="accessibility-contrast-monochrome">
                    <span><img alt="uncolored display" class="accessibility-image"
                            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAAOVBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAC8dlA9AAAAEnRSTlMAAQkLT1BRkpSVl5iam8zP7/E3Z1DDAAAAc0lEQVQokZWSSRaAIAxDG3FAEJXc/7BuVAbrlCX/vTRpEXkXrIX67kinEASSnErCSt8BTB9VICLNkgHkFk0kkec5LfojG3w51HDvY6s0IMnhDtgnq3p4lxZzF7csOKvNTbv+W+IFpGxBO6HXTyuCUf8MlTaTLhCpbG3L9gAAAABJRU5ErkJggg==" />
                    </span><span>uncolored display</span>
                </button>
            </div>
            <div class="contrast-button-accessibility-div button-accessibility-div">
                <button class="row-accessibility-button" title="bright contrast"
                    id="accessibility-contrast-soft">
                    <span><img class="accessibility-image" alt="bright contrast"
                            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAARVBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADc6ur3AAAAFnRSTlMAAQgJCgtOT1BRkpSVl5iam8jMz+/x9WwUowAAAI1JREFUKJGNktsSwiAMRLNSehGrtdLz/5/qg2WwTBy7T4EzE5ZNzP5LKcm9n2F2iBaAx5HQ6BzYxijFaWvBGj5leH0BQQ7lEDZQ9TNUJ1PxpjsQK4js/0mH58wEcP0FUmnVOa1MC/QVjDUYQb44ds2A507C2kaS+84sDvl8iC4o3mDxRnj3R2umm78Mjd4oPA952m8bgAAAAABJRU5ErkJggg==" />
                    </span><span>bright contrast</span>
                </button>
            </div>
            <div class="contrast-button-accessibility-div button-accessibility-div">
                <button class="row-accessibility-button" title="reverse contrast"
                    id="accessibility-contrast-hard">
                    <span><img class="accessibility-image" alt="ניגודיות הפוכה"
                            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAAV1BMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOl5NtAAAAHHRSTlMAAQUICQoLTk9QUXN0kpSVl5iam8jMz9re4O/xs7FJiwAAAKNJREFUKJGNktsOgzAMQ53Sles6GGNA8f9/5x4K6qgyDT9VPVLixAH+S7wX9b8ne4XISJLPM2Gma2CrnYhrthxMNj7t+wsIGSxMuyytgd1ISX4qmJkkZ4Pm8CYDSYcu9m3huM/jY7s1ggVCkvdfwB+lbkopyEiWqXmdFiNkKGC6de1OdgGSr2IfcMpXEsob4KpwfYkqSEGNWoSDHi0gD/0YMn0A2QIYmULugckAAAAASUVORK5CYII=" />
                    </span><span>reverse contrast</span>
                </button>
            </div>
        </div>
    </div>
</div>
<div class="row-accessibility">
    <div id="font-sizing-block-accessibility-header-div" class="accessibility-header-div">
        <h2 class="row-header-accessibility">TEXT SIZE</h2>
    </div>
    <div class="row-accessibility-buttons-container" id="font-sizing-block-accessibility">
        <div class="row-accessibility-buttons-div">

            <div class="font-sizing-button-accessibility-div button-accessibility-div">
                <button class="row-accessibility-button" title="increase text" id="accessibility-fonts-up">
                    <span><img class="accessibility-image"
                            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAMAAAC6V+0/AAAAUVBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABcqRVCAAAAGnRSTlMAAQIEBwkKCxQgIyU2RlthYmN3mqbD3N75/ffAjZwAAABwSURBVBhXbc1XEoAgDATQxYJdsSLc/6AWigTJB7P7hgDgpuzxGy61SJiO9bEz0sdEJYlyU3movgSaii5MB/elsCa0llZH1MqZ1xVoBntvMVrOzHxgdu0LCA1Ev5xK6R3XWmKv7mAbsVtVd58Z6OS4AOceDZR02LMoAAAAAElFTkSuQmCC"
                            alt="increase text" /> </span><span>increase text</span>
                    <span class="font-difference-indicator" id="increased-text-indicator"></span>
                </button>
            </div>
            <div class="font-sizing-button-accessibility-div button-accessibility-div">
                <button class="row-accessibility-button" title="decrease text" id="accessibility-fonts-down">
                    <span><img class="accessibility-image"
                            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAMAAAC6V+0/AAAAUVBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABcqRVCAAAAGnRSTlMAAQIEBwkKCxQgIyU3RlthYmN3mqbD3N75/WrPbOoAAABvSURBVBhXbcvZFoMgDEXRo610UpuO1Pz/h/oQoEThJefutQB6/DtA947BmSw3rqpORfUD4jSvWv/dqvafvCq7TEmfZsOj47yomJqFqC+OUbMm09mOAPdvMoEq2llZGc7SPHkz/W3MdGsQ4t5gGEuuW74NlKW6ljMAAAAASUVORK5CYII="
                            alt="decrease text" /> </span><span>decrease text</span>
                    <span class="font-difference-indicator" id="decreased-text-indicator"></span>
                </button>
            </div>
            <div class="font-sizing-button-accessibility-div button-accessibility-div">
                <button class="row-accessibility-button" title="reset sizing" id="accessibility-fonts-simple">
                    <span><img class="accessibility-image"
                            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUBAMAAAB/pwA+AAAALVBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADBoCg+AAAADnRSTlMABAYLDhAeKkBbZ5G32sGB+xIAAAA8SURBVAhbY2BgYDwDBscYGBiY3oHBc1QmEPC+g9DEM9cAjWyAMPcBzZmAwWTgewPXRlUmazADA0sokAEAvoY2e1eb61QAAAAASUVORK5CYII="
                            alt="reset sizing" /> </span><span>reset sizing</span>
                </button>
            </div>
        </div>
    </div>
</div>

<div class="row-accessibility">
    <div id="cursors-block-accessibility-header-div" class="accessibility-header-div">
        <h2 class="row-header-accessibility">HIGHLIGHT CONTENT</h2>
    </div>
    <div class="row-accessibility-buttons-container" id="highlighting-block-accessibility">
        <div class="row-accessibility-buttons-div">

            <div class="highlighting-button-accessibility-div button-accessibility-div">
                <button class="row-accessibility-button" title="underline links"
                    id="accessibility-content-links">
                    <span><img class="accessibility-image"
                            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAMAAAAM7l6QAAAA81BMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABYh4bhAAAAUHRSTlMAAQIDBAUHCAoLDA0ODxATFRgcJCUnKCorLDc4OjxBQ0ZLTE9XW2FjZ3V5foKIjJKVmJqbnZ6jq62yub7AxcjKzM/V2tze4ujp7e/z9fn7/dE+l70AAADFSURBVBgZ1cHpQgFhGIbhZ/SpsbQorUqJUhHttEiZKCT3+R9Nw1/v/Oe6NP+8s05QVBTvidCVItzSy+z9cSFTgf6qtAunsrTJKpRn7MvQZV0TNxzIcMlHXKqcP3AkgwtoOQWAL4vf4zVdhrrczv6yZqR+mKoOYJTXjJV6/2XrBGg+QkmmTaCkApRladDmSzqEYxm+SW6vScrRleGOqibSjGRI/VLzpHiLa1kyQ+6XEp+8O5k2BoTenCIknxlXYooW87QI/gGkVyJRaE/etAAAAABJRU5ErkJggg=="
                            alt="underline links" /> </span><span>underline links</span>
                </button>
            </div>
            <div class="highlighting-button-accessibility-div button-accessibility-div">
                <button class="row-accessibility-button" title="underline headers"
                    id="accessibility-content-headers">
                    <span><img class="accessibility-image"
                            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcBAMAAACAI8KnAAAAIVBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABt0UjBAAAACnRSTlMAARAeQEFSkZvvep8Y0AAAAElJREFUGJVjYKAmYHFxcVEAE2Au16pVqxzABDYug8QqAygBBqyrYATErFUwgiguGODkAp3kTp7JbKsEoARYMnNVqwKYIMaDVAIAmsgu7kDEZosAAAAASUVORK5CYII="
                            alt="underline headers" /> </span><span>underline headers</span>
                </button>
            </div>
            <div class="highlighting-button-accessibility-div button-accessibility-div">
                <button class="row-accessibility-button" title="images titles"
                    id="accessibility-content-images">
                    <span><img class="accessibility-image"
                            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAMAAAAM7l6QAAAAgVBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABtFS1lAAAAKnRSTlMAAQMEBQgQHyIkJi9DRElbXmtscHN3e4WIiYuSl52go7C1usDo6evx9flG5RBaAAAAfUlEQVQoz93SSRKCQAxA0UTBWVFQnGVQUf79D+jKotvuXrjlr1J5VVlFpNdt3+1PlRrMKrYbMzJ52s16eKQyDPICmIV5GeLBOhIRPT0z7/Eb5Xfh4QTYBHkCwFz3V/Vw3ADACy4ua03X0eEdZnlkc4Hd2Wa3Pzh39K79fuEPdQoeE+qkypwAAAAASUVORK5CYII="
                            alt="images titles" /> </span><span>images titles</span>
                </button>
            </div>
        </div>
    </div>
</div>

<div class="row-accessibility">
    <div id="cursors-block-accessibility-header-div" class="accessibility-header-div">
        <h2 class="row-header-accessibility">ZOOM IN</h2>
    </div>
    <div class="row-accessibility-buttons-container" id="cursors-block-accessibility">
        <div class="row-accessibility-buttons-div">

            <div class="cursors-button-accessibility-div button-accessibility-div">
                <button id="big-white-cursor-button" class="row-accessibility-button" title="big white cursor"
                    id="accessibility-cursor-big-white" class="cursors-button-accessibility">
                    <span><img alt="big white cursor" class="accessibility-image"
                            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAMAAAAM7l6QAAAAS1BMVEW9w8e+xMi/xMi/xcnCx8vCyMvIzdHL0NPS1tnT19nd4OLe4ePf4uTg4+Xq7O3s7u/x8vPx8/P19vf4+fn6+/v8/f3+/v7+//////+Nje9qAAAAXklEQVQoz83SNwKAMBADwTPJ5GDS/v+lFFByomXbaVTI7P/lmvdOMnSapaMd7Wi/mV6z52hHO9of2lJKS3B5EMtHODOXYzig8TiatbC+8xzNrAAq85sgCi7rj1P9pwslQQsBoORDzQAAAABJRU5ErkJggg==" />
                    </span><span>big white cursor</span>
                </button>
            </div>
            <div class="cursors-button-accessibility-div button-accessibility-div">
                <button id="big-black-cursor-button" class="row-accessibility-button" title="big black cursor"
                    id="accessibility-cursor-big-black" class="cursors-button-accessibility">
                    <span><img alt="big black cursor" class="accessibility-image"
                            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAMAAAAM7l6QAAAAWlBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACLSV5RAAAAHXRSTlMAAQMEBgcTFCw3OFBUe3+AgoOIrbfHytrk7fX7/WJfHrcAAABoSURBVChTzdK7FoIwFAXRy1MSEXxHhfn/37SIK43JoWXa3Y7Z/us0fybJIB3tALNm4WiPzFlzydGemIvmrP/oHUJ41kW+/kviG6xtkX2zwFhib3aCV5XlhzOzHhiyHLuDE3w4bky1n75vow1/sgwkQQAAAABJRU5ErkJggg==" />
                    </span><span>big black cursor</span>
                </button>
            </div>
            <div class="cursors-button-accessibility-div button-accessibility-div">
                <button class="row-accessibility-button" title="zoom screen" id="accessibility-zoom-up"
                    class="cursors-button-accessibility">
                    <span><img alt="zoom screen" class="accessibility-image"
                            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAMAAAAM7l6QAAAA51BMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACWqgEeAAAATHRSTlMAAQIEBwgJCgwQGBkaISkqKywwMTM0Nzg/QEFCRUdNTlZdXnFzdHV3eXuRlJeYmp6goqOoqq2vsLLFx8jKzNrc3uDi6Onr7fHz9ff5oUSo3wAAAOJJREFUGBnVwelCAVEAhuF35mSZooW2U2lPiTYlTgtCDfXd//U0+HWUC/A8LIJw964dv13l+VdhoKlWir+Opfh8a22/LvUjZhWkqmEs11PH4AsHqgLZyEDmS2V8VrEBnCywIxk89zoj4WSB4FvreDraJOvcj3quBs86xDPUKpEmHNzqBM+79jDW9nRti/CiAzwV1Uk4WWBJWsaTl1aAmisCZbWZ0dJHhqmS1Ajwpfv63A6AVEWJhwBf1JVGjZtXTT2G+MylJjoNjV0wy2wcnZZyBHUlhswTPElqMldYGTXTLLhf0gcqXp6DTJoAAAAASUVORK5CYII=" />
                    </span><span>zoom screen</span>
                </button>
            </div>
        </div>
    </div>
</div>
<div class="link-access-page">
    <button title="reset settings" id="accessibility-disable-buttons-reset-all">
        <span>reset settings</span>
        <img class="accessibility-image" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAMAAAAMCGV4AAAAmVBMVEUAAACLAACLAACLAACLAACLAACLAACLAACLAACLAACLAACLAACLAACLAACLAACLAACLAACLAACLAACLAACLAACLAACLAACLAACLAACLAACLAACLAACLAACLAACLAACLAACLAACLAACLAACLAACLAACLAACLAACLAACLAACLAACLAACLAACLAACLAACLAACLAACLAACLAACLAAC9qi4cAAAAMnRSTlMAAQUGBwgNDg8QExUXGRojJiwvNTo7PFdYXF1hYmNnaGlwdHt+j5GSx9fZ2tzg8/X5+2glG4cAAAB3SURBVAgdbcHZAkJQAEXRLU0olUbSrNIkzv9/XNzrsbX4w788izzt0UpllHOMrarN0A0yaULNUxXSWOrjACclWHfNgIc8rEhHQOrQGJWqRbzlYUwlxXBWgrXSFfBVhVgLh9pB5XrQHd92tPYyij6tIHt989jlnx+BHA122Bbd9AAAAABJRU5ErkJggg=="
            alt="reset settings" />
    </button>
</div>

</div>

<button title="accessibility menu" tabindex="1" id="bubble-accessibility-toggle-button"
class="bubble-accessibility-toggle-button">
<div><span>CTRL+F2</span> <img class="accessibility-image"
        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAMAAAC7IEhfAAAA+VBMVEUAAAAuzHEuzHEuzHEuzHEuzHEuzHEuzHEuzHEuzHEuzHEuzHEuzHEuzHEuzHEuzHEuzHEuzHEuzHEuzHEuzHEuzHEuzHEuzHEuzHEuzHEuzHEuzHEuzHEuzHEuzHEuzHEuzHEuzHEuzHEuzHEuzHEuzHEuzHEuzHEuzHEuzHEuzHEuzHEuzHEuzHEuzHEuzHEuzHEuzHEuzHEuzHEuzHEuzHEuzHEuzHEuzHEuzHEuzHEuzHEuzHEuzHEuzHEuzHEuzHEuzHEuzHEuzHEuzHEuzHEuzHEuzHEuzHEuzHEuzHEuzHEuzHEuzHEuzHEuzHEuzHEuzHEuzHF74uanAAAAUnRSTlMAAQMEBwgKCwwNDg8QERIVGhscHR8gJicqLzU2OTpFRklKTE1QUVVWXF1kZmtscHFzdXt/goORmJqdnqOlqrm6vL7AwcfIytPa3ODi5Ojz9fn7dlsVJQAAAU5JREFUOMvt08lSwkAUheETwIGIoqKIE4oogwMKziKoKCCDA//7P4yLhEq00mFhlSvvqk/ypXP7piL9rHOAc02sNQBYmwhrDqz9Bs4MD5Nhr04eDaclSWWgV5oPPsx8uQeUJEmpOgDdgu3uWau5+9mFLgD1lPuYXfkEoJ2f8XWU7wDwWYn7+ozsvDq9PWWnJGkq23Lyazby80zphnOL5tVV01020oGTSVRH+GpUnTMOMZrzXC4aOm8PTvgw//Bvoe1BOxTmARIJgL1Q+AjUpXvgIczFAFakVYBYCNwGOpLUAbZC4B2wIUmbwK3ZRYA3S5KsNyBihBlg31keABkjvISR+wNER3BhctYHnI7DGbxbBpgCZschDiwb4Alce+kGjg1wAIteWoJ+sFuAlj8/w0IgLMK6P69DIRC26X87pjXgJXjH/u73C7l+0TTIkPgFhXx2Xm9a0zIAAAAASUVORK5CYII="
        alt="accessibility menu"></div>
</button>
`;

$("head").append(accessibilityCSS);
$("body").append(accessibilityHTML);

const storage = window.localStorage;

function main_js_functionality() {
  function generateQuerySelector(element) {
    if (element.tagName.toLowerCase() == "html") return "HTML";
    let str = element.tagName;
    str += element.id != "" ? "#" + element.id : "";
    if (element.className) {
      let classes = element.className.split(/\s/);
      for (let i = 0; i < classes.length; i++) {
        str += "." + classes[i];
      }
    }
    return generateQuerySelector(element.parentNode) + " > " + str;
  }

  function parseColor(color) {
    var m = color.match(/^rgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)$/i);
    if (m) {
      return [m[1], m[2], m[3]];
    }
    m = color.match(
      /^rgba\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*((0.)?\d+)\s*\)$/i
    );
    if (m) {
      return [m[1], m[2], m[3], m[4]];
    }
  }

  function formatRGBA(arr, alpha) {
    return "rgba(" + arr.join(",") + `,${alpha})`;
  }

  function generateOpaquenessForElement(elem, opaq) {
    let selector = generateQuerySelector(elem);
    if (selector.includes("accessibility-box")) {
      return "";
    }
    let originalColor = window.getComputedStyle(elem)["background-color"];
    let colorsArray = parseColor(originalColor);
    // if element has no background coloring - skip
    if (
      colorsArray.reduce((a, b) => {
        return a + b;
      }) === 0
    ) {
      return "";
    }
    if (colorsArray.length === 4) {
      if (colorsArray[3] > opaq) {
        var rgba = originalColor;
      } else {
        var rgba = formatRGBA(colorsArray, opaq);
      }
      let newStyle = `${selector} {
      background-color: ${rgba} !important;
      }\n`;
      return newStyle;
    } else {
      var rgba = formatRGBA(colorsArray, opaq);
      let newStyle = `${selector} {
  background-color: ${rgba} !important;
  }\n`;
      return newStyle;
    }
  }

  function generateOpaquenessForDocument(opaqueness) {
    let allElements = document.body.getElementsByTagName("*");
    let opacityElements = [];
    for (element of allElements) {
      try {
        opacityElements.push(generateOpaquenessForElement(element, opaqueness));
      } catch {}
    }
    let newStyleElemOpacity = `
<style class="accessibility-styling" id="new-opaqueness-styling">
    ${opacityElements.join("")}
</style>
`;
    return newStyleElemOpacity;
  }

  function changeDocumentOpaqueness(desiredOpaqueness) {
    if ($("#new-opaqueness-styling")) {
      $("#new-opaqueness-styling").remove();
    }
    $("head").append(generateOpaquenessForDocument(desiredOpaqueness));
  }
  // set font-color to black
  function toggleBlackFontColor() {
    if (document.querySelector("#font-color-black-styling")) {
      $("#font-color-black-styling").remove();
    } else {
      let stylingElementArray = [];
      for (element of document.body.getElementsByTagName("*")) {
        try {
          if (element.textContent.length > 0) {
            let selector = generateQuerySelector(element);
            if (selector.includes("accessibility-box")) {
              continue;
            }
            stylingElementArray.push(`${selector} {
color: black !important;
}\n`);
          }
        } catch {}
      }
      let newStyle = `
<style class="accessibility-styling" id="font-color-black-styling">
${stylingElementArray.join(" ")}
</style>
    `;
      $("head").append(newStyle);
    }
  }

  async function toggleOpaqueness() {
    if ($("#accessibility-contrast-soft").hasClass("toggled-on")) {
      $("#new-opaqueness-styling").remove();
      toggleBlackFontColor();
      $("#accessibility-contrast-soft").removeClass("toggled-on");
    } else {
      changeDocumentOpaqueness(0.1);
      toggleBlackFontColor();
      $("#accessibility-contrast-soft").addClass("toggled-on");
    }
  }
  // #############################################################################################
  // invert colors
  // #############################################################################################
  function toggleInvertColors() {
    if (document.querySelector("#invert-colors-accessibility-styling")) {
      $("#accessibility-contrast-hard").removeClass("toggled-on");
      $("#invert-colors-accessibility-styling").remove();
    } else {
      $("head").append(
        `
      <style class="accessibility-styling" id="invert-colors-accessibility-styling">
          html {
              -webkit-filter: invert(100%); 
              -moz-filter:    invert(100%); 
              -o-filter: invert(100%); 
              -ms-filter: invert(100%); }
      </style>
      `
      );
      $("#accessibility-contrast-hard").addClass("toggled-on");
    }
  }
  // #############################################################################################
  // grayscale
  // #############################################################################################
  function toggleGrayScale() {
    //accessibility-styling
    if (document.querySelector("#gray-scale-accessibility-styling")) {
      $("#gray-scale-accessibility-styling").remove();
      $("#accessibility-contrast-monochrome").removeClass("toggled-on");
    } else {
      $("head").append(
        `
      <style class="accessibility-styling" id="gray-scale-accessibility-styling">
          html {
              -webkit-filter: grayscale(100%);
              -moz-filter: grayscale(100%);
              -o-filter: grayscale(100%);
              -ms-filter: grayscale(100%); 
          }
      </style>
      `
      );
      $("#accessibility-contrast-monochrome").addClass("toggled-on");
    }
  }

  // #############################################################################################
  // FONT SIZING
  // #############################################################################################
  function resetFonts() {
    storage.setItem("fontDifference", 0);
    $("#font-size-accessibility-styling").remove();
    $("#accessibility-fonts-down").removeClass("toggled-on");
    $("#accessibility-fonts-up").removeClass("toggled-on");
    $(".font-difference-indicator").empty();
  }

  async function changeFontSize(increase, normal) {
    if (normal) {
      resetFonts();
      return;
    }
    if (!storage.getItem("fontDifference")) {
      storage.setItem("fontDifference", 0);
    }
    var elementsArray = [];
    for (element of document.body.getElementsByTagName("*")) {
      try {
        let selector = generateQuerySelector(element);
        if (selector.includes("accessibility-box")) {
          continue;
        }
        if (element.textContent.length > 0) {
          let reg = /\d+/;
          let currentFontSize_str = window.getComputedStyle(element)[
            "fontSize"
          ];
          let currentFontSize = parseInt(currentFontSize_str.match(reg)[0]);
          if (increase) {
            var newFontSize = currentFontSize + 1;
          } else {
            var newFontSize = currentFontSize - 1;
          }

          let newStyle = `${selector} {
  font-size: ${newFontSize}px !important;
  }\n`;
          elementsArray.push(newStyle);
        }
      } catch {}
    }
    if (increase) {
      var newFontDifference = parseInt(storage.getItem("fontDifference")) + 1;
      storage.setItem("fontDifference", newFontDifference);
    } else {
      var newFontDifference = parseInt(storage.getItem("fontDifference")) - 1;
      storage.setItem("fontDifference", newFontDifference);
    }
    // <span class="font-difference-indicator" id="increased-text-indicator"></span>
    if (newFontDifference == 0) {
      resetFonts();
      return;
    } else if (newFontDifference < 0) {
      document.querySelector("#increased-text-indicator").innerHTML = "";
      document.querySelector(
        "#decreased-text-indicator"
      ).innerHTML = `${newFontDifference}`;
    } else {
      document.querySelector(
        "#increased-text-indicator"
      ).innerHTML = `+${newFontDifference}`;
      document.querySelector("#decreased-text-indicator").innerHTML = "";
    }
    if (!!document.querySelector("#font-size-accessibility-styling")) {
      try {
        $("#font-size-accessibility-styling").remove();
      } catch {}
    }
    $("head").append(
      `<style class="accessibility-styling" id="font-size-accessibility-styling">
${elementsArray.join("")}
</style>`
    );
    // managing "toggled-on" class on buttons
    if (parseInt(storage.getItem("fontDifference")) > 0) {
      if (!$("#accessibility-fonts-up").hasClass("toggled-on")) {
        $("#accessibility-fonts-up").addClass("toggled-on");
      }
      if ($("#accessibility-fonts-down").hasClass("toggled-on")) {
        $("#accessibility-fonts-down").removeClass("toggled-on");
      }
    } else if (parseInt(storage.getItem("fontDifference")) < 0) {
      if (!$("#accessibility-fonts-down").hasClass("toggled-on")) {
        $("#accessibility-fonts-down").addClass("toggled-on");
      }
      if ($("#accessibility-fonts-up").hasClass("toggled-on")) {
        $("#accessibility-fonts-up").removeClass("toggled-on");
      }
    } else {
      try {
        $("#accessibility-fonts-up").removeClass("toggled-on");
        $("#accessibility-fonts-down").removeClass("toggled-on");
      } catch {}
    }
  }
  // #############################################################################################
  // Image Titles
  // #############################################################################################
  async function toggleAnnotateImages() {
    if (document.querySelector(".image-annotation-for-accessibility")) {
      $(".image-annotation-for-accessibility").remove();
      $("#accessibility-content-images").removeClass("toggled-on");
    } else {
      for (image of document.querySelectorAll(
        "img:not(.accessibility-image)"
      )) {
        if (image.alt) var text = image.alt;
        else var text = "No image title";
        image.insertAdjacentHTML(
          "beforeBegin",
          `
<div class="image-annotation-for-accessibility accessibility-styling" style="z-index:9999999999; background-color: #ffffe0 !important; border:1px solid black; padding:5px; font-size: 25px; color: black;">
${text}
</div>
`
        );
      }
      $("#accessibility-content-images").addClass("toggled-on");
    }
  }
  // #############################################################################################
  // Underline headers
  // #############################################################################################
  function toggleUnderlineHeaders() {
    if (document.querySelector("#underline-headers-styling-accessibility")) {
      $("#accessibility-content-headers").removeClass("toggled-on");
      $("#underline-headers-styling-accessibility").remove();
    } else {
      let underlineElementArray = [];
      for (header of document.querySelectorAll("h1, h2, h3, h4, h5, h6")) {
        try {
          let selector = generateQuerySelector(header);
          if (selector.includes("accessibility-box")) {
            continue;
          }
          let underlineElementStyle = `${selector} {
  text-decoration: underline;
}
`;
          underlineElementArray.push(underlineElementStyle);
        } catch {}
      }
      $("head").append(
        `<style class="accessibility-styling" id="underline-headers-styling-accessibility">
${underlineElementArray.join("")}
</style>
`
      );
      $("#accessibility-content-headers").addClass("toggled-on");
    }
  }
  // #############################################################################################
  // Underline links
  // #############################################################################################
  function toggleUnderlineLinks() {
    if (document.querySelector("#underline-links-styling-accessibility")) {
      $("#underline-links-styling-accessibility").remove();
      $("#accessibility-content-links").removeClass("toggled-on");
    } else {
      let underlineElementArray = [];
      for (link of document.querySelectorAll("a")) {
        try {
          let selector = generateQuerySelector(link);
          if (selector.includes("accessibility-box")) {
            continue;
          }
          let underlineElementStyle = `${selector} {
  text-decoration: underline;
}
`;
          underlineElementArray.push(underlineElementStyle);
        } catch {}
      }
      $("head").append(
        `<style class="accessibility-styling" id="underline-links-styling-accessibility">
${underlineElementArray.join("")}
</style>
`
      );
      $("#accessibility-content-links").addClass("toggled-on");
    }
  }
  // #############################################################################################
  // CUSTOM LARGE POINTERS
  // #############################################################################################
  const white_default =
    'cursor: url("https://raw.githubusercontent.com/mickidum/acc_toolbar/master/acctoolbar/cursors/w21.png"), url("https://raw.githubusercontent.com/mickidum/acc_toolbar/master/acctoolbar/cursors/w21.cur"), auto;';
  const white_pointer = `cursor: url("https://raw.githubusercontent.com/mickidum/acc_toolbar/master/acctoolbar/cursors/hw21.png"), url("https://raw.githubusercontent.com/mickidum/acc_toolbar/master/acctoolbar/cursors/hw21.cur"), auto`;
  const black_default =
    'cursor: url("https://raw.githubusercontent.com/mickidum/acc_toolbar/master/acctoolbar/cursors/b2.png"), url("https://raw.githubusercontent.com/mickidum/acc_toolbar/master/acctoolbar/cursors/b2.cur"), auto;';
  const black_pointer = `cursor: url("https://raw.githubusercontent.com/mickidum/acc_toolbar/master/acctoolbar/cursors/hb.png"), url("https://raw.githubusercontent.com/mickidum/acc_toolbar/master/acctoolbar/cursors/bh2.cur"), auto`;

  function toggleBigWhiteCursor() {
    if (document.querySelector(".big-white-cursor-styling-accessibility")) {
      $(".big-white-cursor-styling-accessibility").remove();
      $("#big-white-cursor-button").removeClass("toggled-on");
    } else {
      if (document.querySelector(".big-black-cursor-styling-accessibility")) {
        $(".big-black-cursor-styling-accessibility").remove();
        $("#big-black-cursor-button").removeClass("toggled-on");
      }
      // dealing with default
      $("head")
        .append(`<style class="big-white-cursor-styling-accessibility accessibility-styling">
* {
${white_default}
}
</style>`);
      // dealing with pointer
      let pointersArray = [];
      for (elem of document.querySelectorAll("*")) {
        if (window.getComputedStyle(elem)["cursor"] === "pointer") {
          let selector = generateQuerySelector(elem);
          pointersArray.push(
            `${selector} {
    ${white_pointer}
    }`
          );
        }
      }
      $("head").append(`
      <style class="big-white-cursor-styling-accessibility accessibility-styling">
          ${pointersArray.join("")}
      </style>`);
      $("#big-white-cursor-button").addClass("toggled-on");
    }
  }

  function toggleBigBlackCursor() {
    if (document.querySelector(".big-black-cursor-styling-accessibility")) {
      $(".big-black-cursor-styling-accessibility").remove();
      $("#big-black-cursor-button").removeClass("toggled-on");
    } else {
      if (document.querySelector(".big-white-cursor-styling-accessibility")) {
        $(".big-white-cursor-styling-accessibility").remove();
        $("#big-white-cursor-button").removeClass("toggled-on");
      }
      // dealing with default
      $("head")
        .append(`<style class="big-black-cursor-styling-accessibility accessibility-styling">
* {
${black_default}
}
</style>`);
      //dealing with pointer
      let pointersArray = [];
      for (elem of document.querySelectorAll("*")) {
        if (window.getComputedStyle(elem)["cursor"] === "pointer") {
          let selector = generateQuerySelector(elem);
          pointersArray.push(
            `${selector}, ${selector} > * {
    ${black_pointer}
    }`
          );
        }
      }
      $("head")
        .append(`<style class="big-black-cursor-styling-accessibility accessibility-styling">
${pointersArray.join("")}
</style>`);
      $("#big-black-cursor-button").addClass("toggled-on");
    }
  }
  // #############################################################################################
  // ZOOM
  // #############################################################################################
  async function toggleZoomAccessibility() {
    if (document.querySelector("#zoom-accessibility")) {
      $("#zoom-accessibility").remove();
      $("#accessibility-zoom-up").removeClass("toggled-on");
    } else {
      let zoomStylingsArray = [];
      for (elem of document.querySelectorAll("*")) {
        try {
          let selector = generateQuerySelector(elem);
          if (selector.includes("accessibility-box")) {
            continue;
          }
          zoomStylingsArray.push(`
          ${selector} {
            zoom: 1.04;
            -moz-transform: scale(1.05);
            -moz-transform-origin: 0 0;
          }
          `);
        } catch {}
      }
      $("head").append(`
      <style id="zoom-accessibility" class="accessibility-styling">
        ${zoomStylingsArray.join("")}
      </style>
      `);
      $("#accessibility-zoom-up").addClass("toggled-on");
    }
  }
  // #############################################################################################
  // REMOVE ANIMATIONS
  // #############################################################################################
  function toggleAnimations() {
    if (document.querySelector("#remove-animations-accessibility")) {
      $("#remove-animations-accessibility").remove();
      $("#accessibility-disable-animations-button").removeClass("toggled-on");
    } else {
      let animationStyles = [];
      for (elem of document.querySelectorAll("*")) {
        try {
          let selector = generateQuerySelector(elem);
          if (selector.includes("accessibility-box")) {
            continue;
          }
          animationStyles.push(
            `${selector} {
    -webkit-animation: none;
    -moz-animation: none;
    -ms-animation: none;
    animation: none;
  }`
          );
        } catch {}
      }
      $("body").append(
        `<style id="remove-animations-accessibility" class="accessibility-styling">
${animationStyles.join("")}
</style>
`
      );
      $("#accessibility-disable-animations-button").addClass("toggled-on");
    }
  }
  // #############################################################################################
  // RESET EVERYTHING
  // #############################################################################################
  function resetAccessibilityStyling() {
    $(".accessibility-styling").remove();
    $("*").removeClass("toggled-on");
    resetFonts();
  }

  // #############################################################################################
  // toggle accessibility button
  // #############################################################################################

  function toggleAccessibility() {
    let btn = $("#bubble-accessibility-toggle-button");
    let sidebar = $("#accessibility-box");
    if (btn.hasClass("bubble-toggled-on")) {
      btn.removeClass("bubble-toggled-on");
      btn.fadeIn();
      sidebar.animate(
        {
          left: "-1000px",
        },
        (speed = "fast")
      );
    } else {
      sidebar.animate(
        {
          left: "0px",
        },
        (speed = "fast")
      );
      btn.fadeOut();
      btn.addClass("bubble-toggled-on");
    }
  }

  // toggle on Ctrl + F2
  document.addEventListener("keydown", function (e) {
    if (e.ctrlKey && e.keyCode === 113) {
      toggleAccessibility();
    }
  });

  // #############################################################################################
  // #############################################################################################
  // adding event listeners
  // #############################################################################################
  // #############################################################################################

  $("#accessibility-box-close-button").on("click", toggleAccessibility);
  $("#bubble-accessibility-toggle-button").on("click", toggleAccessibility);
  $("#accessibility-contrast-monochrome").on("click", toggleGrayScale);
  $("#accessibility-contrast-hard").on("click", toggleInvertColors);
  $("#accessibility-contrast-soft").on("click", toggleOpaqueness);
  $("#accessibility-disable-buttons-reset-all").on(
    "click",
    resetAccessibilityStyling
  );
  $("#accessibility-fonts-up").on("click", () => {
    changeFontSize(true);
  });
  $("#accessibility-fonts-down").on("click", () => {
    changeFontSize();
  });
  $("#accessibility-fonts-simple").on("click", () => {
    changeFontSize(null, true);
  });
  $("#accessibility-content-images").on("click", toggleAnnotateImages);
  $("#accessibility-content-headers").on("click", toggleUnderlineHeaders);
  $("#accessibility-content-links").on("click", toggleUnderlineLinks);
  $("#big-white-cursor-button").on("click", toggleBigWhiteCursor);
  $("#big-black-cursor-button").on("click", toggleBigBlackCursor);
  $("#accessibility-zoom-up").on("click", toggleZoomAccessibility);
  $("#accessibility-disable-animations-button").on("click", toggleAnimations);

  $(document).on("unload", () => {
    storage.setItem("fontDifference", 0);
  });
}

//
//
//
//
//

if (window.jQuery) {
  $ = window.jQuery;
  main_js_functionality();
} else {
  var script = document.createElement("SCRIPT");
  script.src =
    "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js";
  script.type = "text/javascript";
  // this is doc.ready
  //-------------------
  script.onload = function () {
    var $ = window.jQuery;
    main_js_functionality();
  };
  document.getElementsByTagName("head")[0].appendChild(script);
}
