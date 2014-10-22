
<?
require('./includes/dbData.php');
$getPagesStatement = "SELECT * FROM ". $pages_table;
$pages = mysqli_query($con, $getPagesStatement);

?>

<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" href="css/styles.css" media="screen" type="text/css" />

<head>
	<script src="scripts/index.js"></script>
	<script src='http://codepen.io/assets/libs/fullpage/jquery.js'></script>
</head>

<div class="container">
	<div class = "sidebar"> 
		<div class = "templates">
			<ul class = "pages">
				<?
					while ($page = mysqli_fetch_array($pages)) {
						$page_id = $page['id'];
						echo "<li class = 'page' id = '" . $page_id ."'> Page" . $page_id . "</li>";
					}
				?>
			</ul>
		</div>
		<div class = "elements">
			<ul class = "draggable_elements">
				<li class="text_element" draggable="true" element-type="text"></li>
				<li class="image_element" draggable="true" element-type="image"></li>
			</ul>
		</div>
		<div class = "settings">
			Settings
		</div>
	</div>

	<div class = "editor"> 
		<div class ="page_selector">
		<h1> Page 1</h1>
		</div>
		<div class = "current_page">
		</div>
	</div>
</div>



