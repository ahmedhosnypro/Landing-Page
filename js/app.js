/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */


/**
 * Define Global Variables
 */
 let sections = document.querySelectorAll("section");
/**
 * End Global Variables
 * 
 * Start Helper Functions
 */


//Add new section  to navigation bar list with a link to that section
function addNewSectionToNavigationBar(id, textContent){
    const navbarList = document.querySelector("#navbar__list");
    const newLi = document.createElement("li");
    const newHref = document.createElement("a");
    newHref.classList = "menu__link";
    newHref.setAttribute("href", "#" + id);
    newHref.textContent = textContent;
    newLi.appendChild(newHref);
    navbarList.appendChild(newLi);
}

//function that creates a new section after the last section in the page
function createNewSection(){
    sections = document.querySelectorAll("section");
    const newSection = document.createElement("section");
    newSection.innerHTML = sections[0].innerHTML;

    newSection.setAttribute('id',"section" + (sections.length + 1));
    newSection.setAttribute('data-nav',"section " + (sections.length + 1));
    newSection.classList.remove("your-active-class");

    newSection.querySelector('h2').textContent = ("Section " + (sections.length + 1));
    sections[sections.length-1].insertAdjacentElement('afterend', newSection);

    addNewSectionToNavigationBar("section" + (sections.length + 1), "Section " + (sections.length + 1));
}

//creat button to scroll up
function createScrollBtn(){
    const scrollButtn = document.createElement("button");
    scrollButtn.setAttribute("id", "scrollButtn");
    scrollButtn.textContent = " ↑ ";

    //click event to scroll up when click on the scroll Btn
    scrollButtn.addEventListener("click", function(){
    document.body.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"}); // For Safari
    document.documentElement.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"}); // For Chrome, Firefox, IE and Opera
    })
    document.body.appendChild(scrollButtn);
}

//update scroll button status
function updateScrollBtn(){
    if (document.body.scrollTop > 250 || document.documentElement.scrollTop > 250 ) {
        scrollButtn.style.display = "block";
      } else {
        scrollButtn.style.display = "none";
    }
}

/**
 * End Helper Functions
 * 
 * Begin Main Functions
 */

// build the nav
function loadSectionsToNavigationBar(){
    const navbarList = document.querySelector("#navbar__list");
    for(const section of sections){
        addNewSectionToNavigationBar(section.getAttribute("id"), section.getAttribute("data-nav"))
    }
    
}

// Add class 'active' to section when near top of viewport and active link class to be distinguished when active
function updateActiveSection(){
    const sections = document.querySelectorAll("section");
        for(const section of sections){
            box = section.getBoundingClientRect();
            let navLinkSelector = `#navbar__list a[href='#${section.getAttribute("id")}']`;
            const navLink = document.querySelector(navLinkSelector);
            if(box.top <= box.height / 3 && box.bottom >= box.height /3){
                section.classList.add("your-active-class");
                navLink.classList.add("active-class__link");
            }else{
                section.classList.remove("your-active-class");
                navLink.classList.remove("active-class__link");
            }
        }
}
/**
 * End Main Function
 * 
 * Begin Events
 */

// Build menu
//create extra new section when DOM is Ready
// creating the scroll Buttone
document.addEventListener('DOMContentLoaded',  function(){
    loadSectionsToNavigationBar();
    createNewSection();
    createScrollBtn()
});

// Scroll to section on link click
document.querySelector("#navbar__list").addEventListener('click', function scrollToSection(event){
    event.preventDefault();
    if(event.target.nodeName === "A"){  
        const element = document.querySelector(event.target.getAttribute("href"));
        console.log(element);
        element.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
    }  
});

// Set sections as active
// Update scroll button state
document.addEventListener("scroll", function(event){
    updateActiveSection(event);
    updateScrollBtn()
})