/*jslint unparam: true, regexp: true */
/*global window, $ */
$(function () {
    var currentImagesNumber = 0;
    $('#fileupload').fileupload({
        url: "controller/",
        dataType: 'json',
        acceptFileTypes: /(\.|\/)(jpe?g|png)$/i,
        maxFileSize: 5242880,
        disableImageResize: false,
        previewCrop: true,
        singleFileUploads: true,
        done: function (e, data) {
            console.log(data);
            $.each(data.result.files, function (index, file) {
                //$('<p/>').text(file.name).appendTo(document.body);
            });
        }
    }).on('fileuploadadd', function (e, data) {

    }).on('fileuploadprocessdone', function (e, data) {
        /*data.formData = {
         compression: $('input[name=compression]:checked').val(),
         identifier: $('#uid').val()
         };*/
        data.context = $("#context");
        var node = data.context;
        console.log(currentImagesNumber);
        $.each(data.files, function (index, file) {
            var figureSelector = $("figure")[currentImagesNumber];
            var titleSelector = $("p")[currentImagesNumber];
            node.find(titleSelector).html(file.name);
            if (file.preview) {
                var previewImage = node.find(figureSelector).append("<img>");
                previewImage.find("img").attr("src", file.preview.toDataURL());
            }
        });
        currentImagesNumber++;
    }).on('fileuploadprogressall', function (e, data) {
        var progress = parseInt(data.loaded / data.total * 100, 10);
        $('.progress').val(progress);
        $("#create-button").attr("disabled", currentImagesNumber !== 4);

    })
});