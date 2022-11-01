var days = ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'];


const winHeight = $(window).height();


fetch('https://web-api.fotomuseum.ch/api/events-screen', {
    method: "GET",
    headers: {
        "Content-Type": "application/json",
        "X-API-KEY": "529f8fca-1e1b-497a-9902-af8abcf98607"
    },
})
    .then(
        response => { return response.json() }
    )
    .then(
        json => {
            // console.log(json);
            let count = json.length;

            for (let index = 0; index < count; index++) {

                let title = json[index].title_de;
                let titleLegth = (title.length);
                if (titleLegth > 70) {
                    title = title.substring(0, 70) + "...";
                }
                let image = json[index].image_url;
                let start = json[index].start;
                let end = json[index].end;

                var date1 = new Date(start).getUTCDate();
                var date2 = (new Date(start).getMonth() + 1);
                if (new Date(start).getUTCDate() < 10) {
                    date1 = '0' + new Date(start).getUTCDate();
                }
                if (new Date(start).getMonth() < 10) {
                    date2 = '0' + (new Date(start).getMonth() + 1);
                }

                let date = date1 + "." + date2 + ".";
                let dayName = days[new Date(end).getDay()];

                let starthours = new Date(start).getHours();
                let startmins = new Date(start).getMinutes();
                let endhours = new Date(end).getHours();
                let endmins = new Date(end).getMinutes();

                if (starthours < 10) {
                    starthours = "0" + starthours;
                }
                if (startmins < 10) {
                    startmins = "0" + startmins;
                }
                if (endhours < 10) {
                    endhours = "0" + endhours;
                }
                if (endmins < 10) {
                    endmins = "0" + endmins;
                }


                let finalTime = (starthours + ":" + startmins + "–" + endhours + ":" + endmins);


                if (index == 0) {
                    var decide = '<div class="carousel-itemshere active">';
                } else {
                    var decide = '<div class="carousel-itemhere">';
                }

                let element = decide +
                    '<div class="carouselparts">' +

                    '<div class="row">' +
                    '<div class="col-2">' +
                    '<div id="dateholder">' +
                    '<div id="montagHolder">' +
                    '<h5 class="time">' + dayName + '</h5>' +
                    '<h1 class="bold">' + date + '</h1>' +
                    '<h5 class="time">' + finalTime + '</h5>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +

                    '<div class="col-8">' +
                    '<div class="carouselImgHolder">' +
                    '<div style="background-image: url(' + image + ')" class="carouselImg"></div>' +
                    '</div>' +
                    '</div>' +

                    '<div class="col-2"></div>' +
                    '</div>' +


                    '<div class="title">' + title + '</div>' +

                    '</div>' +
                    '</div>';

                $("#allCarousel").append(element);


            }
            // var qrcode = new QRCode(document.getElementById("qrcode"), {
            //     width: 120,
            //     height: 120,
            // });

            // qrcode.makeCode("https://www.fotomuseum.ch/de/events/?utm_source=events&utm_medium=foyer+screen&utm_campaign=Foyer+Screen");


            var increment = 1;
            setInterval(() => {
                if (increment <= count) {
                    animationFunc((increment * winHeight));
                    increment = (increment + 1);
                } else {
                    // animationFunc(0);
                    $(".maincontainer").scrollTop(0);
                    increment = 1;
                }
            }, 5000);


        }
    )
    .catch(err => console.log(err));



function animationFunc(animatetill) {
    $(".maincontainer").animate({
        scrollTop: animatetill
    }, 1000);
}



$('.carousel').carousel({
    interval: 5000
});

