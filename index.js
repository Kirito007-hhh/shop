function listHover()
{
    $("div.rt_ListItem").hover(function() {
        $(this).css("color", "#FFFFFF").css("font-weight", "blod").css("background-color", "#CD0102");
    }, function() {
        $(this).css("color", "#3c3c3c").css("font-weight", "normal").css("background-color", "#FFFFFF");
    });
}
function strPadLeft(str) {
    var pad = "000";
    return pad.substring(0, pad.length - str.length) + str;
}
$(function(){
    listHover();
    $("div.rt_header").find("div.rt_homenav").find("li").hover(function() {
        $(this).css("background-color", "red");
        $(this).find("a").css("color", "#FFFFFF");
    }, function() {
        $(this).css("background-color", "");
        $(this).find("a").css("color", "#3c3c3c");
    });
    $("div.rt_choose_province").bind("click",function(){
        if($("#rt_ProvinceList").children().length>0){
            $("#rt_ProvinceList").slideToggle().css("height","250px").css("overflow-x","hidden").css("overflow-y","scroll");
            $("#rt_CityList").fadeOut();
            $("#rt_StoreList").fadeOut();
        }
    });
    $("div.rt_choose_city").bind("click",function(){
        if($("#rt_CityList").children().length>0){
            $("#rt_CityList").slideToggle().css("height","250px").css("overflow-x","hidden").css("overflow-y","scroll");
            $("#rt_ProvinceList").fadeOut();
            $("#rt_StoreList").fadeOut();
        }
    });
    $("div.rt_choose_store").bind("click",function(){
        if($("#rt_StoreList").children().length>0){
            $("#rt_StoreList").slideToggle().css("height","250px").css("overflow-x","hidden").css("overflow-y","scroll");
            $("#rt_ProvinceList").fadeOut();
            $("#rt_CityList").fadeOut();
        }
    });

    $("div.rt_button_confirm").bind('click', function(event) {
        var store_no = $("div.rt_choose_store_wd").attr("store_no");
        if(store_no){
            location.href = "/store/detail/" + store_no;
        }
    });

    $("div#rt_ProvinceList>div.rt_ListItem").bind("click", function(event) {
        var province_no = $(this).attr("province_no");
        var province_name = $(this).attr("province_name");
        $("div.rt_choose_province_wd").html(province_name).attr("province_no", province_no);
        $.ajax({
            url: '/ajax/getcitys',
            type: 'post',
            dataType: 'json',
            data: {province_no: province_no},
            success: function(response){
                if(response.errno == 0){
                    var _html = "";
                    $.each(response.data, function(key, val){
                        _html += "<div class=\"rt_ListItem\" city_no=\""+ val.city_no +"\" city_name=\""+ val.name +"\">"+ val.name +"</div>";
                    });
                    $("div#rt_CityList").html(_html);
                    listHover();
                    $("div#rt_CityList>div.rt_ListItem").bind("click", function(event) {
                        var city_no = $(this).attr("city_no");
                        var city_name = $(this).attr("city_name");
                        $("div.rt_choose_city_wd").html(city_name).attr('city_no', city_no);
                        $.ajax({
                            url: '/ajax/getstores',
                            type: 'post',
                            dataType: 'json',
                            data: {province_no: province_no, city_no: city_no},
                            success: function(response){
                                if(response.errno == 0){
                                    var _html = "";
                                    $.each(response.data, function(key, val){
                                        _html += "<div class=\"rt_ListItem\" store_no=\""+ val.store_no +"\" store_name=\""+ val.name +"\">"+ val.name +"</div>";
                                    });
                                    $("div#rt_StoreList").html(_html);
                                    listHover();
                                    $("div#rt_StoreList>div.rt_ListItem").bind("click", function(event){
                                        var store_no = $(this).attr("store_no");
                                        var store_name = $(this).attr("store_name");
                                        $("div.rt_choose_store_wd").html(store_name).attr('store_no', store_no);
                                    });
                                }else{
                                    alert(response.errmsg);
                                }
                            }
                        });
                    });
                }else{
                    alert(response.errmsg);
                }
            }
        });
    });

});
