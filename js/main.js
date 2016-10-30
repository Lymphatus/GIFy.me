$(document).ready(function() {
    // Make the upload button trigger the hidden real input widget
    $("#browse-button").on("click", function () {
        $("#fileupload").trigger("click");
    });
});