"use strict";$((function(){$(".js-burger").on("click",(function(){$(this).hasClass("is-active")?($(this).removeClass("is-active"),$(".js-menu").removeClass("is-active"),$("html, .js-header").css("margin-right",""),$("html").removeClass("no-scroll")):($(this).addClass("is-active"),$(".js-menu").addClass("is-active"),$("html, .js-header").css("margin-right",window.innerWidth-$(window).width()+"px"),$("html").addClass("no-scroll"))})),$(".js-card-img").magnificPopup({type:"image",callbacks:{beforeOpen:function(){$(".js-header").css("margin-right",window.innerWidth-$(window).width()+"px")},close:function(){$(".js-header").css("margin-right","")}}}),$.validator.addMethod("js-input-phone",(function(i,n){return this.optional(n)||10===$(n).inputmask("unmaskedvalue").length}),"Введите корректный номер"),$(".js-form").validate({submitHandler:function(i){var n=new FormData(i);$.ajax({url:i.action,method:i.method,data:n,processData:!1,contentType:!1,success:function(n){n.success&&$.magnificPopup.open({items:{src:$(i).find(".js-form-popup"),type:"inline"},closeBtnInside:!0,callbacks:{beforeOpen:function(){$(".js-header").css("margin-right",window.innerWidth-$(window).width()+"px")},close:function(){$(".js-header").css("margin-right","")}}})}})},errorPlacement:function(i,n){n.parent().append(i)}}),$(".js-input-phone").inputmask("+7 (999) 999-99-99"),$(".js-input-name").on("input",(function(){var i=$(this).val().replace(/[\.]/gi,"");$(this).val(i)}))}));