// static data using objects

let james={

    fname:'James',
    lname:'Butt',
    company:'Benton',
    address:' 6649 N Blue Gum St',
    city:' NewOrleans',
    country:'Orleans',
    color:' #8bc447',
    photo:'images/james.jpg',

};
let josephine={

    fname:'Josephine',
    lname:'Darakjy',
    company:'Chanay',
    address:' 4 B Blue Ridge Blvd',
    city:' Brighton',
    country:'Livingston',
    color:' #8a3b93',
    photo:'images/default.jpg',

};
let art={

    fname:'Art',
    lname:'Venere',
    company:'Chemel',
    address:'  8 W Cerritos Ave #54',
    city:' Bridgeport',
    country:'Gloucester',
    color:' #1473bb',
    photo:'images/default.jpg',

};
let lenna={

    fname:'Lenna',
    lname:'Paprocki',
    company:' Feltz Printing',
    address:'  639 MainS t ',
    city:' Anchorage',
    country:'Anchorage',
    color:' #c32482',
    photo:'images/default.jpg',

};
let simona={

    fname:'Simona',
    lname:'Morasca',
    company:'  Chanay',
    address:'  3 M cauleyDr ',
    city:' Ashland',
    country:'Ashland',
    color:' #8a3b93',
    photo:'images/default.jpg',

};


let donette={

    fname:'Donette',
    lname:'Foller',
    company:'  Feltz Printing',
    address:'  34 Center St ',
    city:' Hamilton',
    country:'Butler',
    color:' #c32482',
    photo:'images/default.jpg',

};

let mitsue={

    fname:'Mitsue',
    lname:'Tollner',
    company:'  Benton ',
    address:'   7 Eads St ',
    city:' Chicago',
    country:'Cook',
    color:' #8bc447',
    photo:'images/default.jpg',

};
let leota={

    fname:'Leota',
    lname:'Dilliard',
    company:'  CommercialPress ',
    address:'    7 W Jackson Blvd ',
    city:'  SanJose',
    country:'SantaClara',
    color:' #dde553',
    photo:'images/default.jpg',

};

let sage={

    fname:'Sage',
    lname:'Wieser',
    company:' Feltz Printing ',
    address:'     5 Boston Ave #88 ',
    city:'  Sioux Falls',
    country:'Minnehaha',
    color:' #c32482',
    photo:'images/sage.jpg',

};

let kris={

    fname:'Kris',
    lname:'Marrier',
    company:' Feltz Printing ',
    address:'     228 Runamuck Pl #2808 ',
    city:'  Baltimore',
    country:'Baltimore',
    color:'  #c32482',
    photo:'images/default.jpg',

};
let minna={

    fname:'Minna',
    lname:'Amigon',
    company:' Chanay ',
    address:'    2371 Jerrol Ave ',
    city:'  Kulpsville',
    country:'Montgomery',
    color:'   #8a3b93',
    photo:'images/minna.jpg',

};
let abel={

    fname:'Abel',
    lname:'Maclead',
    company:' Chemel ',
    address:'   37275 St Rt 17m M ',
    city:'  Middle Island',
    country:'Suffolk',
    color:'  #1473bb',
    photo:'images/default.jpg',

};
let kiley={

    fname:'Kiley',
    lname:'Caldarera',
    company:' Chemel ',
    address:'   25 E 75th St #69',
    city:' Los Angeles',
    country:'Los Angeles',
    color:'  #1473bb',
    photo:'images/default.jpg',

};
let bette={

    fname:'Bette',
    lname:'Ruta',
    company:' Benton ',
    address:'    98 Connecticut Ave Nw',
    city:' Chagrin Falls',
    country:'Geauga',
    color:'  #8bc447',
    photo:'images/default.jpg',

};
let veronika={

    fname:'Veronika',
    lname:'Albares',
    company:' Benton ',
    address:'    56 E Morehead St',
    city:' Laredo',
    country:'Webb',
    color:'  #8bc447',
    photo:'images/default.jpg',

};


let allemploye=[]; // array containing all employes
allemploye.push(james,josephine,art,lenna,donette,simona,mitsue,leota,sage,kris,minna,abel,kiley,bette,veronika);
console.log(allemploye); // testing if employes data appear in the console


const container = document.getElementById("employee-container");

// creating employe list 
allemploye.forEach((emp , index )=> {

    // Create the card div
    const card = document.createElement("div");
    card.classList.add("employee-card");
    card.dataset.index=index;
     /* used for specifing wich employe is clicked on to show details*/

    // Create the image container
    const imageContainer = document.createElement("div");
    imageContainer.classList.add("image-container");

    const img = document.createElement("img");
    img.src = `${emp.photo}`;
    img.alt = `${emp.fname}`;
    imageContainer.appendChild(img);

    // Create the info section
    const info = document.createElement("div");
    info.classList.add("info");

    const name = document.createElement("h3");
    name.innerHTML = `${emp.fname}  ${emp.lname}`;

    const comp = document.createElement("p");
    comp.innerHTML = `${emp.company}`;

    info.appendChild(name);
    info.appendChild(comp);

    // Create the color bar
    const colorBar = document.createElement("div");
    colorBar.classList.add("color-bar");
    colorBar.style.backgroundColor = `${emp.color}`;

    

    // Append everything
    card.appendChild(imageContainer);
    card.appendChild(info);
    card.appendChild(colorBar);
    container.appendChild(card);
});


const detailsDiv = document.getElementById("employee-details");

// creating details section 
$(container).on("click", function(event) {
    const card = $(event.target).closest(".employee-card");

    if (card.length) {
        $(".employee-card.selected").removeClass("selected");
        card.addClass("selected");

        const index = card.data("index");
        const employee = allemploye[index];

        $("#details-photo").attr("src", employee.photo);
        $("#details-name").text(`${employee.fname} ${employee.lname}`).css("color", employee.color);
        $("#details-company").text(employee.company);
        $("#details-address").text(employee.address);
        $("#details-city").text(employee.city);
        $("#details-country").text(employee.country);
        $("#employee-details").css("border-color", employee.color);
        $(".details-bar").css("background-color",employee.color)
        $(container).animate({ marginRight: '300px' }, 100); 
        $(detailsDiv).addClass("show");
    }
});

const closeDetailsButton = document.getElementById("close-details");

$(closeDetailsButton).on("click", function() {
    $(container).animate({ marginRight: '1px' }, 100); 
    $(detailsDiv).removeClass("show");
    $(".employee-card.selected").removeClass("selected");
    console.log("x is visible");
});









