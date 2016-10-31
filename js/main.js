$(document).ready(function () {
    /*
     * Generate a UUID every time we load the page
     * preventing multiple users from overwriting others images
     */
    var UUID = generateUUID();
    var isGIFAvailable = false;
    // Make the upload button trigger the hidden real input widget
    $("#browse-button").on("click", function () {
        $("#fileupload").trigger("click");
    });

    // Create GIF request
    $("#create-button").on("click", function () {
        if (!isGIFAvailable) {
            $("#create-button").addClass("is-loading");
            $.post("controller/gif.php", {
                //If we want an infinite GIF, just POST 1
                loops: $("#infinite-checkbox").is(":checked") ? 1 : $("#param-gif-loops").val(),
                delay: $("#param-gif-delay").val(),
                UUID: UUID
            }).done(function (data) {
                $("#create-button").removeClass("is-loading").attr("href", data);
                $("#create-button-label").html("Download");
                $("#create-button-icon").addClass("fa-download").removeClass("fa-gear");
                isGIFAvailable = true;
                $("#result").attr("src", data);
            })
        } else {

        }
    });

    // Infinite GIF option
    $("#infinite-checkbox").change(function () {
        $("#param-gif-loops").attr("disabled", this.checked);
    });

    // Some parameter validation
    // Don't let user go < 2 or > 99
    $("#param-gif-loops").change(function () {
        ($(this).val() > 99) ? $(this).val(99) : $(this).val();
        ($(this).val() < 2) ? $(this).val(2) : $(this).val();
    });

    // Don't let user go < 10ms or > 5000ms
    $("#param-gif-delay").change(function () {
        ($(this).val() > 5000) ? $(this).val(5000) : $(this).val();
        ($(this).val() < 10) ? $(this).val(10) : $(this).val();
    });

    /* --- UUID generator --- */
    function generateUUID() {
        var d = new Date().getTime();
        if (window.performance && typeof window.performance.now === "function") {
            d += performance.now(); //use high-precision timer if available
        }
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
        return uuid;
    }


    /* --- UPLOADER --- */

    var currentImagesNumber = 0;
    var previewNumber = 0;
    $('#fileupload').fileupload({
        //Max file size is set by php.ini
        url: "controller/index.php",
        dataType: 'json',
        acceptFileTypes: /(\.|\/)(jpe?g|png)$/i,
        disableImageResize: false,
        previewCrop: false,
        singleFileUploads: true,
        previewMinWidth: 256,
        previewMinHeight: 256,
        previewMaxWidth: 512,
        previewMaxHeight: 512,
        change: function (e, data) {
            if (data.files.length > 4 ||
                currentImagesNumber >= 4 ||
                currentImagesNumber + data.files.length > 4) {
                $(".message").attr("hidden", false);
                $(".message-body").html("You cannot add more than 4 files!");
                return false;
            }
        }
    }).on('fileuploadadd', function (e, data) {
        $(".message-body").html("");
        $(".message").attr("hidden", true);
        data.formData = {
            UUID: UUID
        };
        //TODO
        console.log(data);
    }).on('fileuploadstart', function (e, data) {

    }).on('fileuploadprocessdone', function (e, data) {
        data.context = $("#context");
        var node = data.context;
        $.each(data.files, function (index, file) {
            var figureSelector = $("figure")[previewNumber];
            if (file.preview) {
                var previewImage = node.find(figureSelector).append("<img>");
                previewImage.find("img").attr("src", file.preview.toDataURL());
            }
        });
        previewNumber++;
    }).on('fileuploadprocessalways', function (e, data) {
        $.each(data.files, function (index, file) {
            if (file.error) {
                $(".message").attr("hidden", false);
                $(".message-body").append("<li>" + file.name + ": " + file.error + "</li>");
            }
        });
    }).on('fileuploadprogressall', function (e, data) {
        var progress = parseInt(data.loaded / data.total * 100, 10);
        $('.progress').val(progress);
    }).on('fileuploaddone', function (e, data) {
        currentImagesNumber++;
        $("#create-button").attr("disabled", currentImagesNumber !== 4);
    }).on('fileuploadfail', function (e, data) {
        $.each(data.files, function (index, file) {
            if (file.error) {
                $(".message").attr("hidden", false);
                $(".message-body").append("<li>" + file.name + ": " + file.error + "</li>");
            }
        });
    }).on('fileuploadalways', function (e, data) {
        console.log(e);
    });
});