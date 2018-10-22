<?php echo $format.' preview of site:';
$formats = explode('x', $format); ?>
<div class="fotorama" data-nav="thumbs" data-height="<?=$formats[0]; ?>" data-width="<?=$formats[1];?>">
    <?php foreach($photos as $item) {
     echo "<a href='".$item['url']."'><img src='".$item['url']."'></a>";
    }
    ?>
</div>