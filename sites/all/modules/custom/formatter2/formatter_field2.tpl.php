<?php
$thumb = explode('x', $thumb_style);
$unit = explode('x', $image_style); ?>
<!--Get rid of styles-->
<div class="gallery" id="switch_slider">
  <h2>switch slider</h2>
  <div class="slider">
    <ul>
      <?php foreach ($images as $key => $item) {
        print "<li class='gallery_image'><img src='" . $item . "' class='slides' alt='" . $item . "'/></li>";
      }
      ?>
    </ul>
  </div>
  <div class="slider-pagi">
    <div class="pagi-container">
      <ul class="paginator" style="padding: 0;">
        <?php foreach ($thumbs as $key => $item) {
          print "<li><a><img src='" . $item . "' alt='" . $item . "'/></a></li>";
        }
        ?>
      </ul>
    </div>
  </div>
</div>
