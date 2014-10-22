<?

require('./includes/dbData.php');

//Set up variables
if (isset($_POST['task'])) $task = $_POST['task']; else $task = NULL;
if (isset($_POST['user_id'])) $user_id = $_POST['user_id']; else $user_id = -1;
if (isset($_POST['data'])) $data = $_POST['data']; else $data = NULL;
if (isset($_GET['command'])) $command = $_GET['command']; else $command = NULL;

header('Content-type: application/json');

// Check if there are results
if ($result = mysqli_query($con, $command))
{
		//We didn't return anything
		if (gettype($result) == 'boolean') {
			echo "1";
			die;
		}

		// If so, then create a results array and a temporary one
	    // to hold the data
	    $resultArray = array();
	    $tempArray = array();
	try
	{	
	    // Loop through each row in the result set
	    while($row = $result->fetch_object())
	    {
	        // Add each row into our results array
	        $tempArray = $row;
	        array_push($resultArray, $tempArray);
	    }
	 
	    // Finally, encode the array to JSON and output the results
	    echo json_encode($resultArray);
	}
	catch (Exception $e)
	{
		if ($result == 1) 
		{
			$resultArray = array('result' => 'success');
			echo json_encode($resultArray);
			die;
		}
		
	}
	
	
}
 
// Close connections
mysqli_close($con);

?>