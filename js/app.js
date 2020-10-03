//variables
const courses=document.querySelector('#courses-list'),
      shoppingCartContent=document.querySelector('#cart-content tbody'),
      clearCartBtn=document.querySelector('#clear-cart');






//event listeners

loadEventListeners();
function loadEventListeners()
{
    courses.addEventListener('click',buyCourse);
    shoppingCartContent.addEventListener('click',removeCourse);

    //clear cart
    clearCartBtn.addEventListener('click',clearCart);
    document.addEventListener('DOMContentLoaded',getFromlocalStorage);
}


//functions
function buyCourse(e)
{
    e.preventDefault();
    if(e.target.classList.contains('add-to-cart'))
    {
        const course=e.target.parentElement.parentElement;
        getCourseInfo(course);
    }
}

function getCourseInfo(course)
{
    const courseinfo={
        img: course.querySelector('img').src,
        title: course.querySelector('h4').textContent,
        price: course.querySelector('.price span').textContent,
        id:course.querySelector('a').getAttribute('data-id')

    }

    //insert into shopping cart'
    addIntoCart(courseinfo);
}

function addIntoCart(course)
{
    const row=document.createElement('tr');
    row.innerHTML=`
      <tr>
         <td><img src="${course.img}" width=100></td>
         <td>"${course.title}"</td>
         <td>"${course.price}"</td>
         <td><a href="#" class="remove" data-id="${course.id}">X</a>
         </td>
        </tr>

    `;
    //ad into shoppijg cart
    shoppingCartContent.appendChild(row);
    saveIntoStorage(course);
}
//stores into local storage
function saveIntoStorage(course)
{
  let courses=getContentsFromStorage();
  //add into array
  courses.push(course);
  localStorage.setItem('courses',JSON.stringify(courses));

}

//add from storage into load
function getFromlocalStorage()
{
    let coursesLS=getContentsFromStorage();
    coursesLS.forEach(function(course)
    {
        const row=document.createElement('tr');
       row.innerHTML=`
      <tr>
         <td><img src="${course.img}" width=100></td>
         <td>"${course.title}"</td>
         <td>"${course.price}"</td>
         <td><a href="#" class="remove" data-id="${course.id}">X</a>
         </td>
        </tr>

    `;

    shoppingCartContent.appendChild(row);
    });
}


//remove from the cart
function removeCourse(e)
{
    let course, courseId;

    if(e.target.classList.contains('remove'))
    {
        e.target.parentElement.parentElement.remove();
        course=e.target.parentElement.parentElement;
        courseId=course.querySelector('a').getAttribute('data-id');
    }
    //remove from local storage
    removeCourseFromStorage(courseId);

}

function removeCourseFromStorage(id)
{
  let coursesLS=getContentsFromStorage();
  coursesLS.forEach(function(courseLS,index)
  { if(courseLS.id===id)
    {
        coursesLS.splice(index,1);
    }

  });
  localStorage.setItem('courses',JSON.stringify(coursesLS));
}

//clears the cart
function clearCart(e)
{
    //shoppingCartContent.innerHTML='';
    while(shoppingCartContent.firstChild)
    {
        shoppingCartContent.removeChild(shoppingCartContent.firstChild);
    }
    clearFromStorage();
}

function clearFromStorage()
{
    localStorage.clear();
}

function getContentsFromStorage()
{
    let courses;
    if(localStorage.getItem('courses')===null)
    {
        courses=[];
    }
    else
    {
        courses=JSON.parse(localStorage.getItem('courses'));
    }
    return courses;
}
