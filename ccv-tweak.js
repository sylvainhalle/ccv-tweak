// ==UserScript==
// @name        Canadian Common CV Tweak
// @author      Sylvain Hallé
// @description Tweak the Canadian Common CV's interface
// @match       https://ccv-cvc.ca/researcherProcManageGenericCV*
// @require     http://code.jquery.com/jquery-1.11.2.min.js
// @date        2015-02-07
// @version     1.0
// @namespace   CVC
// @license     Mozilla Public License 2.0
// @grant       none
// ==/UserScript==

// Initialize jQuery; since the CCV uses Dojo, we must run it
// in no-conflict mode
var $j = jQuery.noConflict();

// -----------------------------
// Configuration settings. This is editable if you like.
// -----------------------------

var ccv_config = {
  "pageWidth" : 1280, // Global width of the page in pixels
  
  // Parameters for the "conference papers" page
  "conferencePapers" : {
    // Width of each column in pixels
    "columns" : [
      { "width" : 40,  "showHeader" : false },
      { "width" : 40,  "showHeader" : false },
      { "width" : 40,  "showHeader" : false },
      { "width" : 400, "showHeader" : true },
      { "width" : 60,  "showHeader" : false },
      { "width" : 400, "showHeader" : true },
      { "width" : 100, "showHeader" : true },
      { "width" : 100, "showHeader" : true }
    ]
  }
};

if ($j("#table").length !== 0 // Main page
    || $j("#tableConferencePublications").length !== 0 // Publications page
) { // OK, we are in a page where we should do something

// -----------------------------
// Global settings
// -----------------------------

// We must first override the 800px page width that is hard-coded
// in the style of lots of elements inside the page
$j("body").width(ccv_config.pageWidth);
$j("#cn-head-inner > header > div").width(ccv_config.pageWidth);
$j("#cn-cmb").width(ccv_config.pageWidth);
$j("#cn-cols > div").width(ccv_config.pageWidth);
$j("#cn-cols > div > table").width(ccv_config.pageWidth);
$j("#cn-body-inner-1col").width(ccv_config.pageWidth);
$j("#cen-centre-col").width(ccv_config.pageWidth);
$j("#cn-centre-col-inner table").width(ccv_config.pageWidth);

// For every "rectangle" of data...
// We first set it to the new width, and set its height to
// auto. Its contents will fill the page vertically, instead of only
// using up 300px.
$j("#divSurroundTable").width(ccv_config.pageWidth).height("auto");

// We then change the text style of every rectangle. To display more
// data, we remove boldface and set the text to be slightly smaller
$j("#divSurroundTable > table th > a").add("#divSurroundTable > table td").css(
  {
    "font-weight" : "normal",
    "color" : "black",
    "font-size" : "16px",
    "font-family" : "'Liberation Sans Narrow', 'Arial Narrow', sans-serif"
  });

// -----------------------------
// Conference papers
// -----------------------------

// Force the table to listen to our dimensions
$j("#tableConferencePublications").css(
  {
    "table-layout" : "fixed",
    "width" : ccv_config.pageWidth
  }
);

// Re-enable word-wrapping for table cells
$j("#tableConferencePublications th").add(
  "#tableConferencePublications th a").add(
  "#tableConferencePublications td").css(
  {
    "word-wrap" : "break-word",
    "white-space" : "normal"
  }
);

// Manually force the width of each table cell according to config
$j("#tableConferencePublications thead th").each(function(index, el) {
  $j(this).width(ccv_config.conferencePapers.columns[index].width);
  if (ccv_config.conferencePapers.columns[index].showHeader === false) {
    $j(this).children("a").css({"display" : "none"});
  }
});
$j("#tableConferencePublications tbody tr").each(function(i, el) {
  $j(this).children("td").each(function(index, e) {
    $j(this).width(ccv_config.conferencePapers.columns[index].width);  
  })
});

};