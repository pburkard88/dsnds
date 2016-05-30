
$(document).ready(function(){var htmEditor,cssEditor,jsEditor;
$.getScript('http://ajaxorg.github.io/ace/build/src-noconflict/ace.js',function(){
  $.getScript('http://ajaxorg.github.io/ace/build/src-noconflict/ext-language_tools.js',function(){

      ace.require("ace/ext/language_tools");
      
      jsEditor = ace.edit("jsEditor");
      jsEditor.getSession().setMode("ace/mode/javascript");
      jsEditor.setTheme("ace/theme/merbivore");
      jsEditor.setOptions({
            enableBasicAutocompletion: true,
            enableSnippets: true
      });
      jsEditor.commands.on("afterExec", function(e){ 
        // activate autocomplete when paren or .(dot) is typed
      if (e.command.name == "insertstring"&&/^[\\.\(.]$/.test(e.args)) { 
          jsEditor.execCommand("startAutocomplete") 
      } 
    });
      jsEditor.setShowPrintMargin(false);
      jsEditor.setDisplayIndentGuides(false);
      jsEditor.setHighlightActiveLine(false);
    
    
      cssEditor = ace.edit("cssEditor");
      cssEditor.getSession().setMode("ace/mode/css");
      cssEditor.setTheme("ace/theme/merbivore");
      cssEditor.setOptions({
            enableBasicAutocompletion: true,
            enableSnippets: true
      });
      cssEditor.commands.on("afterExec", function(e){ 
        if (e.command.name == "insertstring"&&/^[\w\:.]$/.test(e.args)) { 
          cssEditor.execCommand("startAutocomplete") 
      } 
    });
      cssEditor.setShowPrintMargin(false);
      cssEditor.setDisplayIndentGuides(false);
      cssEditor.setHighlightActiveLine(false);
    
      htmEditor = ace.edit("htmEditor");
      htmEditor.getSession().setMode("ace/mode/html");
      htmEditor.setTheme("ace/theme/merbivore");
      htmEditor.setOptions({
            enableBasicAutocompletion: true,
            enableSnippets: true
      });
      htmEditor.commands.on("afterExec", function(e){ 
        if (e.command.name == "insertstring"&&/^[\<.]$/.test(e.args)) { 
          htmEditor.execCommand("startAutocomplete") 
      } 
    });
      htmEditor.setShowPrintMargin(false);
      htmEditor.setHighlightActiveLine(false);
      
      $('#btnFoo').click(function(){
          htmEditor.insert("<div class=\"container\"></div>");
      });    
  });
});

$(function() {

$('#myTab a').click(function (e) {
   e.preventDefault();
   $(this).tab('show');
});

var viewportWidth = $(window).width();
$('#monitor').html(viewportWidth);

$(window).bind("resize", function(event){
    if (this == event.target) {
     $('.sp').removeAttr('style');
    }
    var viewportWidth = $(window).width();
    $('#monitor').html(viewportWidth);
});
  
$('.resize').resizable({
    handles: 's,e',  
  minWidth:150,
    maxWidth:1200,
    resize:function(event,ui){
      var x=ui.element.outerWidth();
      var y=ui.element.outerHeight();
        var par=$(this).parent().width();
      var ele=ui.element;
      var factor = par-x;
      
        //console.log("floated?"+par+":"+x);
      
        if (x==par) {
            jsEditor.resize();
            cssEditor.resize();
            htmEditor.resize();
            return;
      }
        
        $.each(ele.siblings(),function(idx,item){
          
          ele.siblings().eq(idx).css('height',y+'px');
            ele.siblings().eq(idx).css('width',(factor)+'px');
          
        });
      
        if (x>=(par-100)) {
          $(".resize").resizable("option","maxWidth",ui.size.width);
            return;
      }
      
        jsEditor.resize();
        cssEditor.resize();
        htmEditor.resize();
    }
});

$('.sp:not(.resize)').resizable({
    handles: 's',
    start: function(event, ui) {
        $('iframe').css('pointer-events','none');
         },
    stop: function(event, ui) {
        $('iframe').css('pointer-events','auto');
      },
    resize:function(event,ui){
      
        var x=ui.element.outerWidth();
      var y=ui.element.outerHeight();
        var par=$(this).parent().width();
      var ele=ui.element;
      
        if (x==par) {
            jsEditor.resize();
            cssEditor.resize();
            htmEditor.resize();
            return;
      }
      
        $.each(ele.siblings(),function(idx,item){
          ele.siblings().eq(idx).css('height',y+'px');
        });
      
        jsEditor.resize();
        cssEditor.resize();
        htmEditor.resize();
    }
});

/*
$('.inner').click(function (e) {
   $(this).parents('.sp').css('height','150px');
});
*/


$('#includes').change(function(ele){
});


$('#tags').change(function(ele){
    ele = $('#tags').next('.bootstrap-select').find('.filter-option');
  var val = ele.html();
    val = val.replace(/,/g, '');
    ele.html(val);
});




/* find groups */
$('li>a.single').click(function(e) {
 
  e.stopPropagation();
  
  var par = $(this).parent();
  par.parent().find('.selp').removeClass('selp');
  var idx = $(this).index();
 
  par.nextAll('li').each(function() {
    
    if ($(this).has('dt').size()>0) {
      return false; // next parent reached, stop
    }
    $(this).toggleClass('selp');
    
    //par.trigger('select');
    
  });
  
  if (par.has('dt').size()==0) {
  
    par.prevAll('li').each(function() {
      
      if ($(this).has('dt').size()>0) {
        $(this).toggleClass('selp');
        
        return false; // this parent reached, stop
      }
      $(this).toggleClass('selp');   
      
    });
    
  }
  
  /* unset the siblings */
  $('.selp').removeClass('selected');
  var selectedOpt = $('#includes').selectpicker('val');
  
  if($.isArray(selectedOpt)){
  

    $('.selp').each(function(idx,item){
      
      var posi = selectedOpt.indexOf($(item).find('a').text());
      //var posi = selectedOpt.indexOf(item);
      
      // alert(posi);
      if (posi>-1) {
          selectedOpt.splice(posi,1);
      
          //alert(selectedOpt);
          $('#includes').selectpicker('val',selectedOpt);
      }
      
    })
  
  }
  
  selectedOpt = ($('#includes').selectpicker('val'))||[];
  
  /* set the new val */
  par.addClass('selected');
  selectedOpt.push(par.find('a').text());
  $('#includes').selectpicker('val',selectedOpt);
  
});

});

$('.pane-settings').click(function(){
  $(this).next('.pane-panel').toggle("slide", { direction: "right" },400);
});




});