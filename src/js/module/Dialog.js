define('module/Dialog', function () {
  /**
   * Dialog
   */
  var Dialog = function () {
    /**
     * Toggle button status
     *
     * @param {jQuery} $btn
     * @param {Boolean} bEnable
     */
    var toggleBtn = function ($btn, bEnable) {
      if (bEnable) {
        $btn.removeClass('disabled').attr('disabled', false);
      } else {
        $btn.addClass('disabled').attr('disabled', true);
      }
    };

    /**
     * Show image dialog
     *
     * @param {jQuery} $dialog
     * @param {Function} fnInsertImages 
     * @param {Function} fnInsertImage 
     */
    this.showImageDialog = function ($dialog, fnInsertImages, fnInsertImage) {
      var $imageDialog = $dialog.find('.note-image-dialog');
      var $imageInput = $dialog.find('.note-image-input'),
          $imageUrl = $dialog.find('.note-image-url'),
          $imageBtn = $dialog.find('.note-image-btn');

      $imageDialog.on('shown.bs.modal', function () {
        $imageInput.on('change', function () {
          fnInsertImages(this.files);
          $(this).val('');
          $imageDialog.modal('hide');
        });
        $imageUrl.val('').keyup(function () {
          toggleBtn($imageBtn, $imageUrl.val());
        }).trigger('focus');
        $imageBtn.click(function (event) {
          $imageDialog.modal('hide');
          fnInsertImage($imageUrl.val());
          event.preventDefault();
        });
      }).on('hidden.bs.modal', function () {
        $imageInput.off('change');
        $imageDialog.off('shown.bs.modal hidden.bs.modal');
        $imageUrl.off('keyup');
        $imageBtn.off('click');
      }).modal('show');
    };

    /**
     * Show video dialog
     *
     * @param {jQuery} $dialog 
     * @param {Object} videoInfo 
     * @param {Function} callback 
     */
    this.showVideoDialog = function ($dialog, videoInfo, callback) {
      var $videoDialog = $dialog.find('.note-video-dialog');
      var $videoUrl = $videoDialog.find('.note-video-url'),
          $videoBtn = $videoDialog.find('.note-video-btn');

      $videoDialog.on('shown.bs.modal', function () {
        $videoUrl.val(videoInfo.text).keyup(function () {
          toggleBtn($videoBtn, $videoUrl.val());
        }).trigger('keyup').trigger('focus');

        $videoBtn.click(function (event) {
          $videoDialog.modal('hide');
          callback($videoUrl.val());
          event.preventDefault();
        });
      }).on('hidden.bs.modal', function () {
        $videoUrl.off('keyup');
        $videoBtn.off('click');
        $videoDialog.off('shown.bs.modal hidden.bs.modal');
      }).modal('show');
    };

    /**
     * Show link dialog
     *
     * @param {jQuery} $dialog
     * @param {Object} linkInfo
     * @param {function} callback
     */
    this.showLinkDialog = function ($dialog, linkInfo, callback) {
      var $linkDialog = $dialog.find('.note-link-dialog');
      var $linkText = $linkDialog.find('.note-link-text'),
          $linkUrl = $linkDialog.find('.note-link-url'),
          $linkBtn = $linkDialog.find('.note-link-btn');

      $linkDialog.on('shown.bs.modal', function () {
        $linkText.html(linkInfo.text);
        $linkUrl.val(linkInfo.url).keyup(function () {
          toggleBtn($linkBtn, $linkUrl.val());
          if (!linkInfo.text) { $linkText.html($linkUrl.val()); }
        }).trigger('focus');
        $linkBtn.click(function (event) {
          $linkDialog.modal('hide'); //hide and createLink (ie9+)
          callback($linkUrl.val());
          event.preventDefault();
        });
      }).on('hidden.bs.modal', function () {
        $linkUrl.off('keyup');
        $linkBtn.off('click');
        $linkDialog.off('shown.bs.modal hidden.bs.modal');
      }).modal('show');
    };

    /**
     * Show help dialog
     *
     * @param {jQuery} $dialog
     */
    this.showHelpDialog = function ($dialog) {
      $dialog.find('.note-help-dialog').modal('show');
    };
  };

  return Dialog;
});
