<?php
		/* SESSÃO para ver se já passou pelo login */
		if (!isset($_SESSION)) {
			session_start();
			// tempo para expirar a sessão
			session_cache_expire(30);
		}

			$autorizado = "";
			$check_acesso= "true";
		
		function autorizado($strUsers, $strGroups, $UserName, $UserGroup) { 
			$valido = False; 
		
			if (!empty($UserName)) { 
				$arrayUsers = Explode(",", $strUsers); 
				$arrayGroups = Explode(",", $strGroups); 
			if (in_array($UserName, $arrayUsers)) { 
				$valido = true; 
			} 
			if (in_array($UserGroup, $arrayGroups)) { 
				$valido = true; 
			} 
			if (($strUsers == "") && true) { 
				$valido = true; 
			} 
		} 
			return $valido; 
		}
		$restrito_volta = "../index.php?action=lessLogin";
		
		if (!((isset($_SESSION['usu_login'])) && (autorizado("",$autorizado, $_SESSION['usu_login'], $_SESSION['grupo'])))) {   
			$qsChar = "?";
			$url = $_SERVER['PHP_SELF'];
	
		if (strpos($restrito_volta, "?")) $qsChar = "&";
		if (isset($QUERY_STRING) && strlen($QUERY_STRING) > 0) 
			$url .= "?" . $QUERY_STRING;
			$restrito_volta = $restrito_volta. $qsChar . "accesscheck=" . urlencode($url);
			
			header("Location: ". $restrito_volta);
			exit;
		}
?>