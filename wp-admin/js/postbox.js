var postboxes,wp_auto_columns,wpAutoColumns=false;(function(a){postboxes={add_postbox_toggles:function(c,b){this.init(c,b);a(".postbox h3, .postbox .handlediv").click(function(){var e=a(this).parent(".postbox"),f=e.attr("id");if("dashboard_browser_nag"==f){return}e.toggleClass("closed");postboxes.save_state(c);if(f){if(!e.hasClass("closed")&&a.isFunction(postboxes.pbshow)){postboxes.pbshow(f)}else{if(e.hasClass("closed")&&a.isFunction(postboxes.pbhide)){postboxes.pbhide(f)}}}});a(".postbox h3 a").click(function(f){f.stopPropagation()});a(".postbox a.dismiss").click(function(g){var f=a(this).parents(".postbox").attr("id")+"-hide";a("#"+f).prop("checked",false).triggerHandler("click");return false});a(".hide-postbox-tog").click(function(){var e=a(this).val();if(a(this).prop("checked")){a("#"+e).show();if(a.isFunction(postboxes.pbshow)){postboxes.pbshow(e)}}else{a("#"+e).hide();if(a.isFunction(postboxes.pbhide)){postboxes.pbhide(e)}}postboxes.save_state(c)});a('.columns-prefs input[type="radio"]').click(function(){var e=a(this).val(),f,g,h=a("#poststuff");if(e==="0"){if(typeof(wp_auto_columns)=="function"){wpAutoColumns=true;wp_auto_columns()}}else{if(h.length){if(e==2){h.addClass("has-right-sidebar");a("#side-info-column").append(a("#side-sortables"));a(document.body).removeClass("responsive")}else{if(e==1){h.removeClass("has-right-sidebar");a("#normal-sortables").before(a("#side-sortables"));a(document.body).removeClass("responsive")}}}else{for(f=4;(f>e&&f>1);f--){g=a("#"+d(f)+"-sortables");a("#"+d(f-1)+"-sortables").append(g.children(".postbox"));g.parent().hide()}for(f=1;f<=e;f++){g=a("#"+d(f)+"-sortables");if(g.parent().is(":hidden")){g.addClass("temp-border").parent().show()}}a(".postbox-container:visible").css("width",100/e+"%")}}postboxes.save_order(c)});function d(e){switch(e){case 1:return"normal";break;case 2:return"side";break;case 3:return"column3";break;case 4:return"column4";break;default:return""}}},init:function(c,b){a.extend(this,b||{});a("#wpbody-content").css("overflow","hidden");a(".meta-box-sortables").sortable({placeholder:"sortable-placeholder",connectWith:".meta-box-sortables",items:".postbox",handle:".hndle",cursor:"move",distance:2,tolerance:"pointer",forcePlaceholderSize:true,helper:"clone",opacity:0.65,stop:function(f,d){if(a(this).find("#dashboard_browser_nag").is(":visible")&&"dashboard_browser_nag"!=this.firstChild.id){a(this).sortable("cancel");return}postboxes.save_order(c);d.item.parent().removeClass("temp-border")},receive:function(f,d){if("dashboard_browser_nag"==d.item[0].id){a(d.sender).sortable("cancel")}}})},save_state:function(d){var b=a(".postbox").filter(".closed").map(function(){return this.id}).get().join(","),c=a(".postbox").filter(":hidden").map(function(){return this.id}).get().join(",");a.post(ajaxurl,{action:"closed-postboxes",closed:b,hidden:c,closedpostboxesnonce:jQuery("#closedpostboxesnonce").val(),page:d})},save_order:function(c){var b,d=a(".columns-prefs input:checked").val()||0;b={action:"meta-box-order",_ajax_nonce:a("#meta-box-order-nonce").val(),page_columns:d,page:c};a(".meta-box-sortables").each(function(){b["order["+this.id.split("-")[0]+"]"]=a(this).sortable("toArray").join(",")});a.post(ajaxurl,b)},pbshow:false,pbhide:false};a(document).ready(function(){wpAutoColumns=a("#wp_auto_columns").prop("checked");wp_auto_columns=function(){var b=a(window).width(),e,d,c=1;if(!wpAutoColumns){return}if(b<681){a(document.body).addClass("folded")}if(b>680&&getUserSetting("mfold")!="f"){a(document.body).removeClass("folded")}if(adminpage=="post-php"){e=a("#post-body").width();if(e<801){a("#poststuff").removeClass("has-right-sidebar");a("#normal-sortables").before(a("#side-sortables"))}if(e>800&&e<1150){a("#poststuff").addClass("has-right-sidebar");a("#side-info-column").append(a("#side-sortables"));a(document.body).removeClass("wide-screen")}if(e>1149){a(document.body).addClass("wide-screen")}}else{if(adminpage=="index-php"){d=a("#dashboard-widgets").width();if(d<801){a("#postbox-container-2").hide();a("#normal-sortables").after(a("#side-sortables"));c=1}if(d>800&&d<1201){a("#postbox-container-2").show().append(a("#side-sortables"));a("#postbox-container-3").hide();a("#side-sortables").after(a("#column3-sortables"));c=2}if(d>1200&&d<1601){a("#postbox-container-3").show().append(a("#column3-sortables"));a("#postbox-container-4").hide();a("#column3-sortables").after(a("#column4-sortables"));c=3}if(d>1600){a("#postbox-container-4").show().append(a("#column4-sortables"));c=4}a(".postbox-container:visible").css("width",100/c+"%")}}};a(window).resize(function(){wp_auto_columns()});wp_auto_columns()})}(jQuery));