var swsource = "https://noiework.cn/sw.js";                                          
                                                                  
function PWAforwpreadCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(";");
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==" ") c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}
 if("serviceWorker" in navigator) {
                       window.addEventListener('load', function() {			         		
        navigator.serviceWorker.register(swsource, {scope: 'https://noisework.cn/'}).then(function(reg){                                                                                        
            console.log('Congratulations!!Service Worker Registered ServiceWorker scope: ', reg.scope);
                                                                                                      
        }).catch(function(err) {
            console.log('ServiceWorker registration failed: ', err);
        });	
                                                                                                                                                                                                                                                                
        var deferredPrompt;                           
        window.addEventListener('beforeinstallprompt', (e) => {
  
  deferredPrompt = e;
                                            
      if(deferredPrompt != null || deferredPrompt != undefined){
          
          var a2hsviashortcode = document.getElementsByClassName("pwaforwp-sticky-banner");
          var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent); 
          if(a2hsviashortcode !== null && checkbarClosedOrNot() && (typeof pwa_cta_assets !== 'undefined') && (pwa_cta_assets.a2h_sticky_on_desktop_cta==1 || isMobile)){
              for (var i = 0; i < a2hsviashortcode.length; i++) {
                a2hsviashortcode[i].style.display="flex"; 
            }
          }

          

       }
                                                                                                      
});			    
function checkbarClosedOrNot(){
  var closedTime = PWAforwpreadCookie("pwaforwp_prompt_close");
    if(closedTime){
      var today = new Date();
      var closedTime = new Date(closedTime);
      var diffMs = (today-closedTime);
      var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); /* minutes*/
      if(diffMs){/*diffMins<4*/
        return false;
      }
    }
    return true;
}

/* Safari 3.0+ "[object HTMLElementConstructor]" */
var isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || (typeof safari !== 'undefined' && safari.pushNotification));
if( isSafari ){
  var a2hsviashortcode = document.getElementsByClassName("pwaforwp-add-via-class");
    if(a2hsviashortcode !== null){
        for (var i = 0; i < a2hsviashortcode.length; i++) {
          a2hsviashortcode[i].style.display="inline-block"; 
      }
    }
    
    var a2hsviashortcode = document.getElementsByClassName("pwaforwp-sticky-banner");
    var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent); 
    if(a2hsviashortcode !== null && checkbarClosedOrNot() && (typeof pwa_cta_assets !== 'undefined') && (pwa_cta_assets.a2h_sticky_on_desktop_cta==1 || isMobile) ){
        for (var i = 0; i < a2hsviashortcode.length; i++) {
          a2hsviashortcode[i].style.display="flex"; 
      }
    }
}                                                         
                                       
                                                                                                                                                 
                                       var a2hsviashortcode = document.getElementsByClassName("pwaforwp-add-via-class");
                                          if(a2hsviashortcode !== null){
                                              for (var i = 0; i < a2hsviashortcode.length; i++) {
                                                a2hsviashortcode[i].addEventListener("click", addToHome); 
                                            }
                                          }
                           
                                       window.addEventListener('appinstalled', (evt) => {
  
                                            var a2hsviashortcode = document.getElementsByClassName("pwaforwp-add-via-class");
                                                   if(a2hsviashortcode !== null){
                                                       for (var i = 0; i < a2hsviashortcode.length; i++) {
                                                         a2hsviashortcode[i].style.display="none"; 
                                                     }
                                                   }
                                                   
                                                   var a2hsviashortcode = document.getElementsByClassName("pwaforwp-sticky-banner");
                                                      if(a2hsviashortcode !== null){
                                                          for (var i = 0; i < a2hsviashortcode.length; i++) {
                                                            a2hsviashortcode[i].style.display="none"; 
                                                        }
                                                      }
                                            var addtohomeBtn = document.getElementById("pwaforwp-add-to-home-click");
                                            if(addtohomeBtn !==null){ 
                                              addtohomeBtn.style.display="none";
                                            }                                           
                                       });  
                                                                                            
                                       function addToHome(){
                                           if(!deferredPrompt){return ;}
                                           deferredPrompt.prompt();							  
                                           deferredPrompt.userChoice
                                             .then((choiceResult) => {
                                               if (choiceResult.outcome === "accepted") {
                                                   
                                                 document.getElementById("pwaforwp-add-to-home-click").style.display = "none"; 
                                         
                                                  var a2hsviashortcode = document.getElementsByClassName("pwaforwp-add-via-class");
                                                   if(a2hsviashortcode !== null){
                                                       for (var i = 0; i < a2hsviashortcode.length; i++) {
                                                         a2hsviashortcode[i].style.display="none"; 
                                                     }
                                                   }
                                                   
                                                   var a2hsviashortcode = document.getElementsByClassName("pwaforwp-sticky-banner");
                                                      if(a2hsviashortcode !== null){
                                                          for (var i = 0; i < a2hsviashortcode.length; i++) {
                                                            a2hsviashortcode[i].style.display="none"; 
                                                        }
                                                      }
                                                                                                                            
                                                 console.log("User accepted the prompt");

                                               } else {
                                                 console.log("User dismissed the prompt");
                                               }
                                               deferredPrompt = null;
                                           });
                                           
                                          }
                            window.addEventListener("offline", pwaforwpOnNetworkChange);   
                            function pwaforwpOnNetworkChange(event) {
                              if (!navigator.onLine) {
                                var a2hsdesk = document.getElementById("pwaforwp-add-to-home-click");
                                if(a2hsdesk !== null){
                                  a2hsdesk.style.display = "none";
                                }
                                var html = '<style class="pwa-offmsgwrcss">.pwa-offmsgwr{background: #323232;color: #f1f1f1;display: table;position: fixed;box-sizing: border-box;box-shadow: 0 2px 4px 0 #000;bottom: 0;left: 0;width: 100%;font-size: 14px;padding: 0;transition: transform .15s cubic-bezier(.17,.67,.39,.95);transform: translateY(200%);z-index: 1000;will-change: transform;}.pwa-offmsgwr table{margin:0px}.pwa-offmsgwr.active{transform: translateY(0);}.pwa-offmsgwr .tdcl{padding: 15px;}.pwa-offmsgwr .span{display: table-cell;vertical-align: middle;}</style><div class="pwa-offmsgwr active"><table width="100%"><tbody><tr><td class="tdcl"><span>You are currently offline</span></td></tr><tr></tr></tbody></table></div>';
                                if(document.getElementsByClassName('pwa-offmsgwrcss').length==0){
                                  document.body.innerHTML += html;
                                }
                                  setTimeout(function(){
                                    if(document.getElementsByClassName('pwa-offmsgwrcss').length){ document.getElementsByClassName('pwa-offmsgwrcss')[0].remove(); }
                                    if(document.getElementsByClassName('pwa-offmsgwr').length){ document.getElementsByClassName('pwa-offmsgwr')[0].remove();}
                                  }, 3000);

                              }else{
                                if(document.getElementsByClassName('pwa-offmsgwrcss').length){document.getElementsByClassName('pwa-offmsgwrcss')[0].remove(); document.getElementsByClassName('pwa-offmsgwr')[0].remove();}
                              }
                            }
                            if( window.matchMedia('(display-mode: standalone)').matches ){
                              var appContent = document.getElementsByClassName('pwaforwp-app-contents');
                              for(var i=0; i<appContent.length; i++){
                                appContent[i].style.display = 'block';
                              }
                            }
                          });
                     }