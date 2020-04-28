//Onload jQuery function call
$(document).ready(function() 
{
	console.log("Document ready is called");
	//Trigger AJAX call when login is clicked
	$("#login_btn").click(function (event) {
        event.preventDefault();
        console.log("Func called");
        fire_ajax_Login(document.getElementById("login_email").value, document.getElementById("login_password").value);

    });
    
	//Trigger AJAX call when Reserve appointment is clicked
    $("#reserve_btn").click(function (event) {
        event.preventDefault();
        console.log("Func called");
        fire_ajax_Reserve();
    });

	//Trigger AJAX call when Get Data for admin is clicked
	$("#get_tables").click(function (event) {
        event.preventDefault();
        console.log("Func called");
        fire_ajax_GetTables(document.getElementById("table_name").value);
    });

	//Trigger AJAX call when Post Testimonials is clicked
	$("#post_testimonials").click(function (event) {
        event.preventDefault();
        console.log("Func called");
        fire_ajax_PostTestimonials();
    });
    
	//Trigger AJAX call when testimonial.html is loaded
	if(window.location.href.match('testimonial.html') != null) {
        console.log("Func called");
        fire_ajax_GetTestimonials();
	}

	//Trigger AJAX call when booking.html is loaded
	if(window.location.href.match('booking.html') != null) {
        console.log("Func called");
		fire_ajax_GetServices();
        fire_ajax_GetPackages();
	}

	//Trigger AJAX call when dashboard.html is loaded
	if(window.location.href.match('dashboard.html') != null) {
        console.log("Func called");
		showBookings();
	}

	//Validates the application cookies
    var allcookies = document.cookie;
               
               // Get all the cookies pairs in an array
               cookiearray = allcookies.split(';');
               
               // Now take key value pair out of this array
               for(var i=0; i<cookiearray.length; i++) {
                  name = cookiearray[i].split('=')[0];
                  value = cookiearray[i].split('=')[1];
				  if(name.trim() == "profile_id") {
					  var userId = value;
					  console.log("User Id:" + userId);
					  if(window.location.href.match('dashboard.html') != null) {
					  	showAppointment(userId);
					  }
					  if(userId == "0c1a8ffe-61f9-41f9-9363-0987d106db05") {
					  	  showAdmin();
					  }
				  }
				  else if(name.trim() == "user_name") {
					  var username = value;
					  console.log("User Id:" + username);
					  showName(username);
				  }
        }
});

//Function to handle welcome message and view & hide of navigation menus
function showName(value) {
	console.log("Toogle is called"+value);
	var firstname = value.split(' ');
	document.getElementById("user_welcome").innerHTML = "Welcome, "+ firstname[0];
	var w = document.getElementById("logout_nav");
	var x = document.getElementById("login_nav");
	var y = document.getElementById("user_welcome");
	var z = document.getElementById("dashboard_nav");
	w.style.display = "block";
    y.style.display = "block";
	z.style.display = "block";
    x.style.display = "none";
}

//Function to handle Admin page navigation for Admin user
function showAdmin() {
	var a = document.getElementById("admin_nav");
    a.style.display = "block";
}

//Function to book Packages for user
function addPackages(pid) {
	console.log(pid);
	function create_UUID(){
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (dt + Math.random()*16)%16 | 0;
        dt = Math.floor(dt/16);
        return (c=='x' ? r :(r&0x3|0x8)).toString(16);
		});
		return uuid;
	}

	var allcookies = document.cookie;
               
               // Get all the cookies pairs in an array
               cookiearray = allcookies.split(';');
               
               // Now take key value pair out of this array
               for(var i=0; i<cookiearray.length; i++) {
                  name = cookiearray[i].split('=')[0];
                  value = cookiearray[i].split('=')[1];
				  if(name.trim() == "profile_id") {
					  var userId = value;
					  console.log("User Id:" + userId);
				  }
				  else if(name.trim() == "user_name") {
					  var username = value;
					  console.log("User Id:" + username);
					  showName(username);
				  }
        }

	var defaultImg = "default.jpg";
	 var formData = {
		booking_id :  create_UUID(),
		profile_id : userId,
		package_id : pid,
		service_id : ""
    }
	console.log(JSON.stringify(formData));
	if(userId==null) {
		swal("Oops!", "You need to login first!", "error");
	}
	else {
		$.ajax({
			type: "POST",
			contentType: "application/json",
			url : "https://wedlockapp.herokuapp.com/api/bookings/",
			dataType: 'json',
			data: JSON.stringify(formData),
			cache: false,
			timeout: 600000,
			statusCode: {
				201: function (data) {
					console.log("201");
					swal("Great!", "You have successfully booked the package!", "success");
				}
			}
		});
	}
}

//Function to show booked appoitments for user
function showAppointment(value) {
	console.log("Appointment for:"+value);
	
	$.ajax({
        type: "GET",
        contentType: "application/json",
        url : "https://wedlockapp.herokuapp.com/api/appointments/?profile_id=" +value,
        dataType: 'json',
		data: JSON.stringify(),
        cache: false,
        timeout: 600000,
        success: function (result) {
			if(result.objects != [] && result.objects != "") {
				document.getElementById("appointment_date").innerHTML = result.objects[0].date ;
				document.getElementById("appointment_time").innerHTML = result.objects[0].time ;
				
			}
			else {
			}
        },
        error: function (e) {
			console.log("Error : " + e);
        }
    });
}

//Function for user signup
function fire_ajax_signup(){
	event.preventDefault();
  	console.log("Fired signup ajax");
  	function create_UUID(){
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (dt + Math.random()*16)%16 | 0;
        dt = Math.floor(dt/16);
        return (c=='x' ? r :(r&0x3|0x8)).toString(16);
		});
		return uuid;
	}
  	
  	//POST request body for sign-up
  	var formData = {
		profile_id :  create_UUID(),
		user_name : $("#user_name").val(),
		bride_name : $("#bride_name").val(),
		groom_name : $("#groom_name").val(),
		user_type : $(".usertype:selected").val(),
		wedding_date : $("#datepicker").val(),
		wedding_city : $("#wedding_city").val(),
		contact_number : $("#contact_number").val(),
		address : $("#address").val(),
		email : $("#email").val(),
		password : $("#password").val()
    }
    
    console.log(JSON.stringify(formData));
    
    $.ajax({
    type : "POST",
    contentType : "application/json",
    url : "https://wedlockapp.herokuapp.com/api/profiles/",
    data : JSON.stringify(formData),
    dataType : 'text',
    success :  function () {
    		swal("Great!", "You have successfully signed up!", "success");
    		//sleep(6000);
            console.log("SUCCESS : ");
			//Reset values as blank
			$("#user_name").val("");
			$("#bride_name").val("");
			$("#groom_name").val("");
			$("#user_type").val("");
			$("#datepicker").val("");
			$("#wedding_city").val("");
			$("#contact_number").val("");
			$("#address").val("");
			$("#email").val("");
			$("#password").val("");
			setTimeout(function(){
			         window.location = 'login.html';
			     },5000);     
    },  
    error : function (e) {
          swal("Oops!", "There is some unexpected error! Try again!", "error");
          console.log("Error : "+ JSON.stringify(e));
        }
    });
}

//Function to Login a user
function fire_ajax_Login(email,password) {
	event.preventDefault();
	console.log("Fired login ajax" + email + password);
    $.ajax({
        type: "GET",
        contentType: "application/json",
        url : "https://wedlockapp.herokuapp.com/api/profiles/?email=" + email +"&password="+password,
        dataType: 'json',
		data: JSON.stringify(),
        cache: false,
        timeout: 600000,
        success: function (result) {
			if(result.objects != [] && result.objects != "") {
				swal("Welcome!", "You have logged in successfully!", "success");
				var d = new Date();
				d.setTime(d.getTime() + (300000));
				var expires = "expires=" + d.toGMTString();
				document.cookie = "profile_id" + "=" + result.objects[0].profile_id + ";" + expires + ";path=/";
				document.cookie = "user_name" + "=" + result.objects[0].user_name + ";" + expires + ";path=/";
				console.log("SUCCESS : " +result.objects[0].profile_id);
				console.log("SUCCESS : " +result.objects[0].user_name);
				console.log("SUCCESS : " +document.cookie);
				setTimeout(function(){
			         window.location = 'index.html';
			     },5000);
				
			}
			else {
				swal("Oops!", "WedLock is not able to find you! Has the excitement made you enter the wrong credentials?", "error");
				
			}
        },
        error: function (e) {
            swal("Oops!", "WedLock is not able to find you! Has the excitement made you enter the wrong credentials?", "error");
			console.log("Error : " + e);
        }
    });
}

//Function to resere appointment for user
function fire_ajax_Reserve() {
	event.preventDefault();
  	console.log("Fired signup ajax");
  	function create_UUID(){
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (dt + Math.random()*16)%16 | 0;
        dt = Math.floor(dt/16);
        return (c=='x' ? r :(r&0x3|0x8)).toString(16);
		});
		return uuid;
	}
  	
  	var allcookies = document.cookie;
               
               // Get all the cookies pairs in an array
               cookiearray = allcookies.split(';');
               
               // Now take key value pair out of this array
               for(var i=0; i<cookiearray.length; i++) {
                  name = cookiearray[i].split('=')[0];
                  value = cookiearray[i].split('=')[1];
				  if(name.trim() == "profile_id") {
					  var userId = value;
					  console.log("User Id:" + userId);
				  }
				  else if(name.trim() == "user_name") {
					  var username = value;
					  console.log("User Id:" + username);
					  showName(username);
				  }
        }
        
  	//POST request body for sign-up
  	var formData = {
		appointment_id :  create_UUID(),
		profile_id : userId,
		name : $("#full_name").val(),
		email : $("#email_addr").val(),
		contact_number : $("#phone").val(),
		date : $("#datepicker").val(),
		number_of_persons : $("#persons").val(),
		time : $("#timepicker").val()
    }
   
    console.log(JSON.stringify(formData));
    if(userId==null) {
		swal("Oops!", "You need to login first!", "error");
	}
	else {
		$.ajax({
		type : "POST",
		contentType : "application/json",
		url : "https://wedlockapp.herokuapp.com/api/appointments/",
		data : JSON.stringify(formData),
		dataType : 'text',
		success :  function () {
    			swal("Great!", "You have successfully booked appointment!", "success");
				console.log("SUCCESS : ");
				//Reset values as blank
				$("#full_name").val("");
				$("#email_addr").val("");
				$("#phone").val("");
				$("#datepicker").val("");
				$("#timepicker").val("");
				$("#persons").val("");     
		},  
		error : function (e) {
			  swal("Oops!", "There is some unexpected error! Try again!", "error");
			  console.log("Error : "+ JSON.stringify(e));
			}
		});
	}
}

//Function to fetch tables from MongoDB database
function fire_ajax_GetTables(resource_name) {
	document.querySelector('table').deleteTHead();
	$.ajax({
        type: "GET",
        contentType: "application/json",
        url : "https://wedlockapp.herokuapp.com/api/"+resource_name+"/",
        dataType: 'json',
		data: JSON.stringify(),
        cache: false,
        timeout: 600000,
        success: function (data) {		
			console.log(data);
			var items = [];
			if($('#table_results tr').length > 0){
				$('#table_results').dataTable().fnClearTable();
				document.getElementById("table_results_wrapper").remove();
				var table_item = [];
				table_item.push("<table id='table_results' class='table table-bordered table-hover' style='width:100%'>");
				$('#holder').append(table_item);
			}
			if(resource_name == 'profiles'){
				items.push("<thead><tr><th>profile_id</th><th>bride_name</th><th>groom_name</th><th>user_name</th><th>user_type</th><th>wedding_date</th><th>wedding_city</th><th>contact_number</th><th>address</th><th>email</th><th>password</th></tr></thead>");
				$('#table_results').append(items);
				$('#table_results').dataTable({
								scrollY:        "600px",
								scrollX:        true,
								scrollCollapse: true,
								paging:         false,
								destroy:		true,
								searching:		true,
								fixedColumns:   {
									leftColumns: 2
								},
								data: data.objects,
								columns:[
									{"data":"profile_id"},
								   {"data":"bride_name"},
								   {"data":"groom_name"},
								   {"data":"user_name"},
								   {"data":"user_type"},
								   {"data":"wedding_date"},
								   {"data":"wedding_city"},
								   {"data":"contact_number"},
								   {"data":"address"},
								   {"data":"email"},
								   {"data":"password"}
								],

				  });
			}
			else if(resource_name == 'appointments') {
				items.push("<thead><tr><th>appointment_id</th><th>profile_id</th><th>name</th><th>email</th><th>contact_number</th><th>number_of_persons</th><th>date</th><th>time</th></tr></thead>");
				$('#table_results').append(items);
				$('#table_results').dataTable({
								scrollY:        "600px",
								scrollX:        true,
								scrollCollapse: true,
								paging:         false,
								destroy:		true,
								searching:		true,
								fixedColumns:   {
									leftColumns: 2
								},
								data: data.objects,
								columns:[
									{"data":"appointment_id"},
								   {"data":"profile_id"},
								   {"data":"name"},
								   {"data":"email"},
								   {"data":"contact_number"},
								   {"data":"number_of_persons"},
								   {"data":"date"},
								   {"data":"time"}
								],

				  });
			}
			else if(resource_name == 'testimonials') {
				items.push("<thead><tr><th>testimonial_id</th><th>profile_id</th><th>date</th><th>message</th><th>title</th><th>image</th></tr></thead>");
				$('#table_results').append(items);
				$('#table_results').dataTable({
								scrollY:        "600px",
								scrollX:        true,
								scrollCollapse: true,
								paging:         false,
								destroy:		true,
								searching:		true,
								fixedColumns:   {
									leftColumns: 2
								},
								data: data.objects,
								columns:[
									{"data":"testimonial_id"},
								   {"data":"profile_id"},
								   {"data":"date"},
								   {"data":"message"},
								   {"data":"title"},
								   {"data":"image"}
								],

				  });
			}
			else if(resource_name == 'packages') {
				items.push("<thead><tr><th>package_id</th><th>type</th><th>cost</th><th>services</th></tr></thead>");
				$('#table_results').append(items);
				$('#table_results').dataTable({
								scrollY:        "600px",
								scrollX:        true,
								scrollCollapse: true,
								paging:         false,
								destroy:		true,
								searching:		true,
								fixedColumns:   {
									leftColumns: 2
								},
								data: data.objects,
								columns:[
									{"data":"package_id"},
								   {"data":"type"},
								   {"data":"cost"},
								   {"data":"services"}
								],

				  });
			}
			else if(resource_name == 'services') {
				items.push("<thead><tr><th>service_id</th><th>name</th><th>category</th><th>details</th><th>cost</th></tr></thead>");
				$('#table_results').append(items);
				$('#table_results').dataTable({
								scrollY:        "600px",
								scrollX:        true,
								scrollCollapse: true,
								paging:         false,
								destroy:		true,
								searching:		true,
								fixedColumns:   {
									leftColumns: 2
								},
								data: data.objects,
								columns:[
									{"data":"service_id"},
								   {"data":"name"},
								   {"data":"category"},
								   {"data":"details"},
								   {"data":"cost"}
								],

				  });
			}
			else if(resource_name == 'bookings') {
				items.push("<thead><tr><th>booking_id</th><th>profile_id</th><th>service_id</th><th>package_id</th></tr></thead>");
				$('#table_results').append(items);
				$('#table_results').dataTable({
								scrollY:        "600px",
								scrollX:        true,
								scrollCollapse: true,
								paging:         false,
								destroy:		true,
								searching:		true,
								fixedColumns:   {
									leftColumns: 2
								},
								data: data.objects,
								columns:[
									{"data":"booking_id"},
								   {"data":"profile_id"},
								   {"data":"service_id"},
								   {"data":"package_id"}
								],

				  });
			}
        },
        error: function (e) {
            swal("Oops!", "WedLock is not able to find you! Has the excitement made you enter the wrong credentials?", "error");
			console.log("Error : " + e);
        }
    });
}

//Function to show the testimonials
function fire_ajax_GetTestimonials() {
	$.ajax({
        type: "GET",
        contentType: "application/json",
        url : "https://wedlockapp.herokuapp.com/api/testimonials/?order_by=-date",
        dataType: 'json',
		data: JSON.stringify(),
        cache: false,
        timeout: 600000,
        success: function (data) {
			var items = [];
            $.each(data.objects, function (key, value) {
				var image = "images/blog/" + value.image;
                items.push("<article class='post post-grid mb-5'><div class='post-thumb'><img src='"+ image +"' alt='' class='img-fluid w-100'></div><div class='blog-meta position-relative'><ul class='list-inline'><li class='list-inline-item'><a class='post-cat' href='#'>"+value.bride_groom+"</a></li><li class='list-inline-item'><span class='date'>"+value.date+"</span></li></ul></div><div class='blog-content'><h2 class='mb-3'>"+value.title+"</h2><p>"+value.message+"</p></div></article>");
            });
            
            $("#testimonial_div").empty();
            $("#testimonial_div").append(items);
            console.log("SUCCESS : ", data);
        },
        error: function (e) {
            console.log("Error : " + e);
        }
    });
}

//Function to view available packages
function fire_ajax_GetPackages() {
	$.ajax({
        type: "GET",
        contentType: "application/json",
        url : "https://wedlockapp.herokuapp.com/api/packages/",
        dataType: 'json',
		data: JSON.stringify(),
        cache: false,
        timeout: 600000,
        success: function (data) {
			var items = [];
            $.each(data.objects, function (key, value) {
				var image = "images/menu/" + value.image;
				console.log("SUCCESS : ", image);
                items.push("<div class='col-lg-4 col-md-6 mb-4 aos-init aos-animate' data-aos='fade-up' data-aos-delay='00'><div class='card border-0 menu-item3'><img src='"+image+"' alt='' class='img-fluid'><div class='card-body'><h3 class='card-title'>"+value.type+"- <span class='text-primary'>Rs "+value.cost+"</span></h3><p>"+value.services+"</p><a class='btn btn-main mt-2' style='color:white' onclick='addPackages(this.id)' id='"+value.package_id+"'>Add to cart</a></div></div></div>");
            });         
            $("#packages_div").empty();
            $("#packages_div").append(items);
            console.log("SUCCESS : ", data);
        },
        error: function (e) {
            console.log("Error : " + e);
        }
    });
}

//Function to view available services
function fire_ajax_GetServices() {
	$.ajax({
        type: "GET",
        contentType: "application/json",
        url : "https://wedlockapp.herokuapp.com/api/services/",
        dataType: 'json',
		data: JSON.stringify(),
        cache: false,
        timeout: 600000,
        success: function (data) {
			var items = [];
			var tx_y = 0;
			var tx_x = 0;
			var incr = false;
            $.each(data.objects, function (key, value) {
				var image = "images/menu/" + value.image;
				
                items.push("<div class='col-lg-6 col-md-6 mb-4 shuffle-item shuffle-item--visible' data-groups='[&quot;"+value.category+"&quot;]' style='position: absolute; top: 0px; left: 0px; visibility: visible; will-change: transform; opacity: 1; transform: translate("+tx_x+"px, "+tx_y+"px) scale(1); transition-duration: 250ms; transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); transition-property: transform, opacity;'><div class='menu-item position-relative '><div class='d-flex align-items-center'><img src='"+image+"' alt='' class='img-fluid'><div><h4>"+value.name+" - <span>Rs."+value.cost+"</span></h4><p>"+value.details+"</p><div class='mb-4'><a onclick='addServices(this.id)' id='"+value.service_id+"' class='btn mt-2'><i class='ti-shopping-cart mr-2 text-primary'></i>Add to cart</a></div></div></div></div></div>");
				if(incr) {
					tx_y = tx_y + 285;
				}
				if(tx_x == 0) {
					 tx_x = 570;
				}
				else {
					tx_x  = 0;
				}
				incr = !incr;
				//items.push("<div><p>I love you Himan</p></div>");
		   });         
            $("#services_div").empty();
            $("#services_div").append(items);
            console.log("SUCCESS : ", data);
        },
        error: function (e) {
            console.log("Error : " + e);
        }
    });
}

//Function to book Services for user
function addServices(sid) {
	console.log(sid);
	function create_UUID(){
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (dt + Math.random()*16)%16 | 0;
        dt = Math.floor(dt/16);
        return (c=='x' ? r :(r&0x3|0x8)).toString(16);
		});
		return uuid;
	}

	var allcookies = document.cookie;
               
               // Get all the cookies pairs in an array
               cookiearray = allcookies.split(';');
               
               // Now take key value pair out of this array
               for(var i=0; i<cookiearray.length; i++) {
                  name = cookiearray[i].split('=')[0];
                  value = cookiearray[i].split('=')[1];
				  if(name.trim() == "profile_id") {
					  var userId = value;
					  console.log("User Id:" + userId);
				  }
				  else if(name.trim() == "user_name") {
					  var username = value;
					  console.log("User Id:" + username);
					  showName(username);
				  }
        }

	 var formData = {
		booking_id :  create_UUID(),
		profile_id : userId,
		package_id : "",
		service_id : sid
    }
	console.log(JSON.stringify(formData));
	if(userId==null) {
		swal("Oops!", "You need to login first!", "error");
	}
	else {
		$.ajax({
			type: "POST",
			contentType: "application/json",
			url : "https://wedlockapp.herokuapp.com/api/bookings/",
			dataType: 'json',
			data: JSON.stringify(formData),
			cache: false,
			timeout: 600000,
			statusCode: {
				201: function (data) {
					console.log("201");
					swal("Great!", "You have successfully booked the service!", "success");
				}
			}
		});
	}
}

//Function to Post a user testimonial
function fire_ajax_PostTestimonials() {
	function create_UUID(){
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (dt + Math.random()*16)%16 | 0;
        dt = Math.floor(dt/16);
        return (c=='x' ? r :(r&0x3|0x8)).toString(16);
		});
		return uuid;
	}

	var allcookies = document.cookie;
               
               // Get all the cookies pairs in an array
               cookiearray = allcookies.split(';');
               
               // Now take key value pair out of this array
               for(var i=0; i<cookiearray.length; i++) {
                  name = cookiearray[i].split('=')[0];
                  value = cookiearray[i].split('=')[1];
				  if(name.trim() == "profile_id") {
					  var userId = value;
					  console.log("User Id:" + userId);
				  }
				  else if(name.trim() == "user_name") {
					  var username = value;
					  console.log("User Id:" + username);
					  showName(username);
				  }
        }

	var brideGroom = $("#bride").val() + " & " + $("#groom").val();
	var d = new Date();
	var strDate = (d.getMonth()+1) + "/" + d.getDate() + "/" + d.getFullYear() ;
	var defaultImg = "default.jpg";

	 var formData = {
		testimonial_id :  create_UUID(),
		profile_id : userId,
		bride_groom : brideGroom,
		date : strDate,
		message : $("#message").val(),
		title : $("#title").val(),
		image : defaultImg
    }
	console.log(JSON.stringify(formData));
	if(userId==null) {
		swal("Oops!", "You need to login first!", "error");
	}
	else {
		$.ajax({
			type: "POST",
			contentType: "application/json",
			url : "https://wedlockapp.herokuapp.com/api/testimonials/",
			dataType: 'json',
			data: JSON.stringify(formData),
			cache: false,
			timeout: 600000,
			statusCode: {
				201: function (data) {
					console.log("201");
					swal("Great!", "You have successfully added your testimonial!", "success");
					setTimeout(function(){
						 window.location = 'testimonial.html';
					 },3000);  
				}
			}
		});
	}
}

//Function to show the bookings for user
function showBookings() {
	
	
	var allcookies = document.cookie;
               
               // Get all the cookies pairs in an array
               cookiearray = allcookies.split(';');
               
               // Now take key value pair out of this array
               for(var i=0; i<cookiearray.length; i++) {
                  name = cookiearray[i].split('=')[0];
                  value = cookiearray[i].split('=')[1];
				  if(name.trim() == "profile_id") {
					  var userId = value;
					  console.log("User Id:" + userId);
				  }
				  else if(name.trim() == "user_name") {
					  var username = value;
					  console.log("User Id:" + username);
					  showName(username);
				  }
        }

	$.ajax({
        type: "GET",
        contentType: "application/json",
        url : "https://wedlockapp.herokuapp.com/api/bookings/?profile_id=" +userId,
        dataType: 'json',
		data: JSON.stringify(),
        cache: false,
        timeout: 600000,
        success: function (data) {
			var items=[];
			var total = 0;
			 $.each(data.objects, function (key, value) {
				if(value.service_id != "" || value.service_id != null) {
					console.log(value.service_id);
					
					$.ajax({
						type: "GET",
						contentType: "application/json",
						url : "https://wedlockapp.herokuapp.com/api/services/?service_id=" +value.service_id,
						dataType: 'json',
						data: JSON.stringify(),
						cache: false,
						timeout: 600000,
						success: function (result) {
							console.log(JSON.stringify(result));
							
							$.each(result.objects, function (k, v) {
								var image = "images/menu/" + v.image;
								total = total + parseInt(v.cost);
								console.log(total);
								items.push("<tr><th scope='row' class='text-left'><img src='"+image+"' alt='' class='img-fluid w-25 mr-3'>"+v.name+"</th><td> </td><td>Rs."+v.cost+"</td><td class='text-right'><i class='ti-close close'></i></td></tr>");
							
							});
							$("#table_bookings").empty();
							$("#table_bookings").append(items);
							document.getElementById("subtotal").innerHTML = "Rs." + total;
							var tax = total * 0.1;
							document.getElementById("tax").innerHTML = "Rs." +  tax;
							var grandtotal = total+tax;
							document.getElementById("total").innerHTML = "Rs." + grandtotal;
						},
						error: function (e) {
							console.log("Error : " + e);
						}
					});
				}
				if(value.package_id != "" || value.package_id != null) {
					console.log(value.package_id);
					$.ajax({
						type: "GET",
						contentType: "application/json",
						url : "https://wedlockapp.herokuapp.com/api/packages/?package_id=" +value.package_id,
						dataType: 'json',
						data: JSON.stringify(),
						cache: false,
						timeout: 600000,
						success: function (result) {
							console.log(JSON.stringify(result));
							$.each(result.objects, function (k, v) {
								var image = "images/menu/" + v.image;
								total = total + parseInt(v.cost);
								console.log(total);
								items.push("<tr><th scope='row' class='text-left'><img src='"+image+"' alt='' class='img-fluid w-25 mr-3'>"+v.type+"</th><td> </td><td>Rs."+v.cost+"</td><td class='text-right'><i class='ti-close close'></i></td></tr>");
							
							});
							//items.push("<tr class='border-bottom'><td colspan='2'><div class='input-group form-group mb-0'><input type='text' class='form-control rounded-0 text-left' placeholder='Enter your coupon' aria-describedby='basic-addon2'></div></td><td></td><td></td><td></td><td><a onclick='applyCoupon()' class='btn btn-main-border pull-right'>Apply Coupon</a></td></tr>");
							$("#table_bookings").append(items);
							document.getElementById("subtotal").innerHTML = "Rs." + total;
							var tax = total * 0.1;
							document.getElementById("tax").innerHTML = "Rs." + tax;
							var grandtotal = total+tax;
							document.getElementById("total").innerHTML = "Rs." + grandtotal;

						},
						error: function (e) {
							console.log("Error : " + e);
						}
					});
				}
				
				
			});

			
        },
        error: function (e) {
			console.log("Error : " + e);
        }
    });
}

//Function to delete cookies and logout user session
function logout() {
	console.log("Logout called");
	var allcookies = document.cookie;
	var cookies = allcookies.split(";");
    for (var i = 0; i < cookies.length; i++)
    {   
        var spcook =  cookies[i].split("=");
		console.log(spcook[0]);
        deleteCookie(spcook[0]);
    }
    function deleteCookie(cookiename)
    {
        var d = new Date();
        d.setDate(d.getDate() - 1);
        var expires = ";expires="+d;
        var name=cookiename;
        var value="";
        document.cookie = name + "=" + value + expires + "; path=/";                    
    }
    window.location = "index.html"; // TO REFRESH THE PAGE
}