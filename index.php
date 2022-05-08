<!DOCTYPE html>
<html>
	<head>
		<meta charset='utf-8'>
		<meta 
     name='viewport' 
     content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0' 
/>
		<title>
			Trainer
		</title>
		<style>
			.nofloat{
				min-height:5.001vh;
				float:none;
			}
			.pretable{
				font-size:4vh;
			}
			.pretable input[type=number]{
				width:20vw;
			}
			.pretable input[type=submit]{
				font-size:6vh;
				width:30vw;
				height:13vw;
			}
			.ranger{
				min-height:5vh;
				font-size:4vh;
			}
			button{
				float:left;
				min-height:5vh;
				font-size:4vh;
			}
			li {
				min-height:5vh;
				font-size:4vh;
			}
			td {
				<?php if(isset($_GET['vt']) and isset($_GET['hr'])){
					if($_GET['vt']<$_GET['hr']){
						$a=(97/$_GET['hr']).'vw';
						echo "	width:".$a."; 
								height:".$a.";";
					}
					else{
						$a=(70/$_GET['vt']).'vh';
						echo "	width:".$a."; 
								height:".$a.";";
					}
				}
					?>
			}
			td{
				border:1px black solid;
				color:white;
				text-align:center;
			}
			.main_tab td{
				font-size:1px;
			}
			.canv{
				float:right;
				width:10vh;
				font-size:1.5vh;
				height:10vh;
				color:white;
			}
			.black td{
				text-align:left;
				border:none;
				width:auto;
				height:auto;
			}
			.black p{
				color:black;
			}
			.nomark{
				list-style-type:none;
			}
			.main_tab{
				margin-left:auto;
				margin-right:auto;
			}
		</style>
	</head>
	<body>
		<div>
			<?php
			$checker=0;
			if(isset($_GET['vt']) and isset($_GET['hr'])){
				if(($_GET['vt']<=100)&($_GET['vt']>=2)&($_GET['hr']<=100)&($_GET['hr']>=2)){
				echo"<table id='main_tab' class='main_tab'>";
				$a=0;
				for($i=1;$i<=$_GET['vt']; $i++){
					echo"
					
					<tr>";
						for($j=1;$j<=$_GET['hr']; $j++){
							$a++;
							echo"<td id='t".$a."' onclick='check(".$a.");'></td>";
						}
					echo"</tr>";
				}
				echo"
			</table>
			<div class='nofloat'>
			<button onclick='start();'>
				Старт!
			</button>
			<button onclick='clean();'>
				Очистить
			</button>
			<button id='manual_use' onclick='manual_do();'>Без времени</button>
			</div>
			<div class='nofloat'>
						<div class='canv' id='canv'>
							Выберите все ячейки заданного цвета!
						</div>
						<div>
							<ol class='nomark'>
								<li id='ok_display'>
									Верно:0
								</li>
								<li id='err_display'>
									Ошибок:0
								</li>
							</ol>
						</div>
			</div>
			<div class='ranger'>
			<input type='range' min='10' max='1000' step='1' value='80' id='myTime' onchange='time=myTime.value;'>
	<input type='range' min='10' max='10000' step='1' value='80' id='myTimeWait' onchange='timeWait=myTimeWait.value;'> 
	<a href='?'><button>Изменить размер</button></a>
		</div>
		<script>
		window.onload = function loadfun(){
			if(window.innerWidth<window.innerHeight){
				if(".$_GET['vt']."<=".$_GET['hr']."){
					main_tab.style.width='99%';
				}
				else{
					main_tab.style.height='75%';
				}
			}else{
				for(i=1; i<=cells;i++){
					a='t'+i;
					b=document.getElementById(a);
					b.style.width='100px';
					b.style.height='100px';
				}
			}
		}
		cells=".$_GET['vt']*$_GET['hr'].";
		var correct=0;
		var incorrect=0;
		var time=80;
		var timeWait=80;
		var checked=null;
		var firstColor=0;
		var summed=0;
		var colorOne='#FFFFFF';
		var colorTwo='#FFFFFF';
		var number2=0;
			function manual_do(){
				if(manual_use.innerHTML=='Без времени'){
				clean();
				colorGenerator();
				for(i=1; i<=(cells/2);i++){
					add(colorOne);
				}
				for(i=1; i<=cells;i++){
					a='t'+i;
					b=document.getElementById(a);
					if(b.innerHTML==''){
						b.innerHTML=colorTwo;
						b.style.backgroundColor=colorTwo;
						b.style.color=colorTwo;
					}
				}
				firstColor=counter();
				manual_use.innerHTML='Скрыть';
				}
				else{
					hide();
					manual_use.innerHTML='Без времени';
				}
			}
			function add(color){
				a='t'+(parseInt(Math.random()*cells)+1);
				b=document.getElementById(a);
				//console.log(a);
				b=document.getElementById(a);
				b.style.backgroundColor=color;
				b.style.color=color;
				b.innerHTML=color;
			}
			function clean(){
				clearTimeout(hide);
				clearTimeout(createTask);
				for(i=1; i<=cells;i++){
					a='t'+i;
					b=document.getElementById(a);
					b.innerHTML='';
					b.style.backgroundColor='#FFFFFF';
					b.style.color='#FFFFFF';
					d=document.getElementById('canv');
					d.style.backgroundColor='#FFFFFF';
					d.innerHTML='Выберите все ячейки заданного цвета!';
					d.style.color='#FFFFFF';
					checked=null;
					summed=0;
					manual_use.innerHTML='Без времени';
				}
			}
			function numGen(){
				var number;
				number=(Math.ceil(Math.random()*255));
				number2=255-number;
				number2=number2.toString(16);
				number=number.toString(16);
				if(number.length==1){
					number='0'+number;
				}
					if(number2.length==1){
					number2='0'+number2;
				}
				return number;
			}
			function colorGenerator(){
				colorOne='#'+numGen();
				colorTwo='#'+number2;
				colorOne=colorOne+numGen();
				colorTwo=colorTwo+number2;
				colorOne=colorOne+numGen();
				colorTwo=colorTwo+number2;
			}
			function start(){
				clean();
				colorGenerator();
				for(i=1; i<=(cells/2);i++){
					add(colorOne);
				}
				for(i=1; i<=cells;i++){
					a='t'+i;
					b=document.getElementById(a);
					if(b.innerHTML==''){
						b.innerHTML=colorTwo;
						b.style.backgroundColor=colorTwo;
						b.style.color=colorTwo;
					}
				}
				setTimeout(hide,time);
				firstColor=counter();
			}
			function counter(){
				c=0;
				for(i=1; i<=cells;i++){
					a='t'+i;
					b=document.getElementById(a);
					if(b.innerHTML==colorOne){
						c++;
					}
				}
				return c;
			}
			function hide(){
				for(i=1; i<=cells;i++){
					a='t'+i;
					b=document.getElementById(a);
						b.style.backgroundColor='#FFFFFF';
						b.style.color='#FFFFFF';
				}
					setTimeout(createTask,timeWait);
			}
			function createTask(){
				c=Math.random();
				if(c<0.5){
					checked=colorTwo;
					firstColor=cells-firstColor;
				}
				else{
					checked=colorOne;
				}
				d=document.getElementById('canv');
				d.style.backgroundColor=checked;
			}
			function check(num){
				if(checked!=null){
					b=document.getElementById('t'+num);
					if(b.innerHTML!='ok'){
						if(b.innerHTML==checked){
							b.style.backgroundColor=checked;
							b.style.color=checked;
							b.innerHTML='ok';
							summed++;
							if(summed>=firstColor){
								checked=null;
								d=document.getElementById('canv');
								d.innerHTML='<h2>Верный ответ!<h2>';
								d.style.backgroundColor='#FFFFFF';
								d.style.color='#00FF00';
								correct++;
								d=document.getElementById('ok_display');
								d.innerHTML='Верно:'+correct;
								setTimeout(clean,3000);	
							}
						}
						else{
							b=document.getElementById('t'+num);
							b.style.backgroundColor='#000000';
							b.style.color='#000000';
							incorrect++;
							d=document.getElementById('err_display');
							d.innerHTML='Ошибок:'+incorrect;
						}
					}
				}
			}
		</script>";
				}else{ $checker=1;}
			}else{ $checker=1;}
				if($checker==1){
					echo"
					<form action='' method='get' class='pretable'>
					<p>Задайте размеры поля</p>
			<table class='black'>
				<tr>
					<td>
						<p>По вертикали:</p>
					</td>
					<td>
						<input name='vt' type='number' min='2' max='100'>
					</td>
				</tr>
				<tr>
					<td>
						<p>По горизонтали:</p>
					</td>
					<td>
						<input name='hr' type='number' min='2' max='100'>
					</td>
				</tr>
				<tr>
					<td colspan='2'>
						<input type='submit' value='ok'>
					</td>
		</form>";
				}
				?>
	</body>
</html>
