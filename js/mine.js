
let navWidth = 0;
// console.log(navWidth)
$(".nav-toggle-menu").click(function () {
    if ($(".nav-tab-menu").offset().left < 0) {
        $(".nav-tab-menu").addClass("open-menu").removeClass("close-menu"),
            (navWidth = $(".nav-tab-menu").width() - 10),
            $(".nav-header").css("left", navWidth),
            $("#nav-toggle").toggleClass("fa-times"),
            // $(".nav-tab-menu").animate({ display:"auto" }, 1100),
            $(".nav-tab-menu .nav-item1").animate({ opacity: "1", paddingTop: "25px" }, 1100),
            $(".nav-tab-menu .nav-item2").animate({ opacity: "1", paddingTop: "25px" }, 1200),
            $(".nav-tab-menu .nav-item3").animate({ opacity: "1", paddingTop: "25px" }, 1300),
            $(".nav-tab-menu .nav-item4").animate({ opacity: "1", paddingTop: "25px" }, 1400),
            $(".nav-tab-menu .nav-item5").animate({ opacity: "1", paddingTop: "25px" }, 1500),
            $(".nav-tab-menu .nav-item6").animate({ opacity: "1", paddingTop: "25px" }, 1600)
        // console.log($(".nav-tab-menu").offset().left)
    }
    else {
        // console.log($(".nav-tab-menu").offset().left)
        // console.log($(".nav-tab-menu").width())
        $(".nav-tab-menu").addClass("close-menu").removeClass("open-menu"),
            $("#nav-toggle").toggleClass("fa-times"),
            $(".nav-header").css("left", 0),
            $(".nav-tab-menu li").animate({ opacity: "0", paddingTop: "500px" }, 500)
    }
});

$("ul li").click(function (e) {
    let apiCategory = $(e.target).attr('id');
    if (apiCategory != undefined) {
        getMovies(apiCategory)
    }
})

let allMovies = [];
async function getMovies(apiCategory) {
    let response = await fetch(`https://api.themoviedb.org/3/${apiCategory}?api_key=17be26625eacc8f82fc40b8cd21dc4a3`);
    let result = await response.json();
    allMovies = result.results
    // console.log(result);
    // console.log(allMovies);
    //let imgPath = "https://image.tmdb.org/t/p/w500";
    displayMovies();
}
getMovies('movie/now_playing');

function displayMovies() {
    var x;
    var Content = '';
    for (let i = 0; i < allMovies.length; i++) {
        if (allMovies[i].poster_path == null) {
            x = `images/dummy-image.jpg`
        }
        else {
            x = `https://image.tmdb.org/t/p/w500${allMovies[i].poster_path}`
        }
        Content += `<div class="col-md-4 mb-4 px-3 shadow">            
        <div class="movie shadow rounded position-relative">                    
        <div class="post"> 
        <img src='${x}' class="img-fluid rounded"/>                   
        <div class="layer d-flex align-items-center">                    
        <div class="info p-0">                                           
            <h2>${allMovies[i].original_title}</h2>                        
            <p>${allMovies[i].overview}</p>                        
            <p>rate:${allMovies[i].vote_average}</p>   
            <p>${allMovies[i].release_date}</p>                                            
        </div>                    
        </div>                    
        </div>                    
        </div>                
        </div>`
    }
    document.getElementById("rowData").innerHTML = Content;
}

// function displayMovies() {
//     var Content='' ;
//     allMovies.map(i => (
//         Content+=`<div class="col-md-6 col-lg-4 my-3 shadow">            
//         <div class="movie shadow rounded position-relative">                    
//         <div class="post">                    
//        <img src={'https://image.tmdb.org/t/p/w500${allMovies[i].poster_path}'} class="img-fluid rounded"/>                   
//        <div class="layer d-flex align-items-center">                    
//         <div class="info p-0">                                           
//             <h2>${allMovies[i].original_title}</h2>                        
//             <p>${allMovies[i].overview}</p>                        
//             <p>rate:${allMovies[i].vote_average}</p>                        
//             <p>${allMovies[i].release_date}</p>                                            
//         </div>                    
//         </div>                    
//         </div>                    
//         </div>                
//         </div>`
//     ))
//     document.getElementById("rowData").innerHTML = Content;
//     }

$("#movieWord").keyup(async function () {
    let searchText = $("#movieWord").val();
    if (searchText != "") {
        let response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${searchText}&api_key=17be26625eacc8f82fc40b8cd21dc4a3`);
        let result = await response.json();
        allMovies = result.results;
        displayMovies();
    }
});

$("#search").keyup(function () {
    var x;
    var Content = '';
    let txt = $("#search").val();
    if (txt != "") {
        for (let i = 0; i < allMovies.length; i++) {
            if ((allMovies[i].original_title.toLowerCase().includes(txt.toLowerCase())) || (allMovies[i].overview.toLowerCase().includes(txt.toLowerCase()))) {
                if (allMovies[i].poster_path == null) {
                    x = `images/dummy-image.jpg`
                }
                else {
                    x = `https://image.tmdb.org/t/p/w500${allMovies[i].poster_path}`
                }
                Content += `<div class="col-md-4 mb-4 px-3 shadow">            
            <div class="movie shadow rounded position-relative">                    
            <div class="post"> 
            <img src='${x}' class="img-fluid rounded"/>                   
            <div class="layer d-flex align-items-center">                    
            <div class="info p-0">                                           
                <h2>${allMovies[i].original_title}</h2>                        
                <p>${allMovies[i].overview}</p>                        
                <p>rate:${allMovies[i].vote_average}</p>                        
                <p>${allMovies[i].release_date}</p>                                            
            </div>                    
            </div>                    
            </div>                    
            </div>                
            </div>`
            }

        }
    }
    document.getElementById("rowData").innerHTML = Content;
});

    let userNameRegex = /^[a-zA-Z0-9]+$/,
    userEmailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
    userPhoneRegex = /^(002)?(01)[0-25][0-9]{8}$/,
    userAgeRegex = /^[1-9][0-9]?$|^100$/,
    userPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    function userNameValid() {
        if (userNameRegex.test($("#name").val())) {
            $("#name-alert").css({ display: "none" });
            return true;
        }
        else { $("#name-alert").css({ display: "block" }); }
    }
    function userEmailValid() {
        if (userEmailRegex.test($("#email").val())) {
            $("#email-alert").css({ display: "none" });
            return true;
        }
        else $("#email-alert").css({ display: "block" });
    }
    function userPhoneValid() {
        if (userPhoneRegex.test($("#phone").val())) {
            $("#phone-alert").css({ display: "none" });
            return true;
        }
        else $("#phone-alert").css({ display: "block" });
    }
    function userAgeValid() {
        if (userAgeRegex.test($("#age").val())) {
            $("#age-alert").css({ display: "none" });
            return true;
        }
        else $("#age-alert").css({ display: "block" });
    }
    function userPasswordValid() {
        if (userPasswordRegex.test($("#password").val())) {
            $("#password-alert").css({ display: "none" });
            return true;
        }
        else $("#password-alert").css({ display: "block" });
    }
    function userRePasswordValid() {
        if ($("#password").val() == $("#rePassword").val()) {
            $("#repassword-alert").css({ display: "none" });
            $("#submitBtn").removeAttr('disabled');
            return true;
        }
        else{ $("#repassword-alert").css({ display: "block" });
            $("#submitBtn").attr('disabled',true);}
    }
    $("#name").keyup(userNameValid),
    $("#email").keyup(userEmailValid),
    $("#phone").keyup(userPhoneValid),
    $("#age").keyup(userAgeValid),
    $("#password").keyup(userPasswordValid),
    $("#rePassword").keyup(userRePasswordValid);
    
    // $("#submitBtn").click(function () {
    //     if ( userNameValid() && userEmailValid() && userPhoneValid() && userAgeValid() && userPasswordValid() && userRePasswordValid() )
    //     {
    //         console.log("true");
    //       $("#submitBtn").removeAttr('readonly');
    
    //     } else{
    //         console.log("flase");
    //         $("#submitBtn").attr('readonly','readonly');
    //     }  
    // });

