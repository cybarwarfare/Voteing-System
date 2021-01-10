<?php

if (isset($_SERVER['HTTP_ORIGIN'])) {
	header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
	header('Access-Control-Allow-Credentials: true');
	header('Access-Control-Max-Age: 86400');
}

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
	if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD'])) {
		header(
			'Access-Control-Allow-Methods: GET, POST, PUT, DELETE, PATCH, OPTIONS'
		);
	}
	if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS'])) {
		header(
			"Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}"
		);
	}
	exit(0);
}

    require 'vendor/autoload.php';
    //databse connection.
    Flight::register('db', 'PDO', array('mysql:host=localhost;dbname=vote','root',''));

    class Booth {
        public static function Create() {
            //fetching data from api.
            $email = Flight::request()->data->email;
            $password = Flight::request()->data->password;
            $boothname = Flight::request()->data->boothname;
            $collage = Flight::request()->data->collage;
            $db = Flight::db();
            //save data to the database.
            $sql = "INSERT INTO admin (boothname, email, password, collage) VALUES (?,?,?,?)";
            $stmt= $db->prepare($sql);
            $stmt->execute([$boothname, $email, $password, $collage]);
            Flight::json(array('status' => true,'reason' => 'sucess'));
        }
        public static function Login(){
            $email = Flight::request()->data->email;
            $password = Flight::request()->data->password;
            $db = Flight::db();
            try{
                // check login
                $sql = "SELECT * FROM admin WHERE email =:email AND password =:password";
                $stmt= $db->prepare($sql);
                $stmt ->bindParam(':email',$email);
                $stmt ->bindParam(':password',$password);
                $stmt->execute();
                $data = $stmt->fetch();

                if( $stmt->rowCount() != 0){
                    Flight::json(array('status' => true,'reason' => $email, 'data :' => $data));
                }else{
                    Flight::json(array('status' => false,'reason' => 'no user Found'));
                }
            } catch(PDOException $e){
                // error
                Flight::json(array('status' => false,'reason' =>"error :". $e->getMessage()));
            }
        }
        public static function admin(){
            $email = Flight::request()->data->email;
            $db = Flight::db();
            try{
                // check login
                $sql = "SELECT * FROM admin WHERE email =:email";
                $stmt= $db->prepare($sql);
                $stmt ->bindParam(':email',$email);
                $stmt->execute();
                $data = $stmt->fetch();
                Flight::json($data);
            } catch(PDOException $e){
                // error
                Flight::json(array('status' => false,'reason' =>"error :". $e->getMessage()));
            }
        }
        public static function adminData(){
            $boothname = Flight::request()->data->boothname;
            $db = Flight::db();
            try{
                // check login
                $sql = "SELECT collage FROM admin WHERE boothname =:boothname";
                $stmt= $db->prepare($sql);
                $stmt ->bindParam(':boothname',$boothname);
                $stmt->execute();
                $data = $stmt->fetchColumn();
                Flight::json($data);
            } catch(PDOException $e){
                // error
                Flight::json(array('status' => false,'reason' =>"error :". $e->getMessage()));
            }
        }
        public static function Election() {
            //fetching data from api.
            try{
                $electionname = Flight::request()->data->electionname;
                $boothname = Flight::request()->data->boothname;
                $date = Flight::request()->data->date;
                $db = Flight::db();
                echo "email :".$electionname." Password :".$boothname ."boothname :".$date;
                //save data to the database.
                $sql = "INSERT INTO election (electionname, boothname, date) VALUES (?,?,?)";
                $stmt= $db->prepare($sql);
                $stmt->execute([$electionname, $boothname, $date]);
                Flight::json(array('status' => true,'reason' => 'sucess'));
            } catch(PDOException $e){
                // error
                Flight::json(array('status' => false,'reason' =>"error :". $e->getMessage()));
            }
        }
        public static function ElectionList(){
            $boothname = Flight::request()->data->boothname;
            $db = Flight::db();
            try{
                // check login
                $sql = "SELECT * FROM election WHERE boothname =:boothname";
                $stmt= $db->prepare($sql);
                $stmt ->bindParam(':boothname',$boothname);
                $stmt->execute();
                $data = $stmt->fetchAll();
                Flight::json($data);
            } catch(PDOException $e){
                // error
                Flight::json(array('status' => false,'reason' =>"error :". $e->getMessage()));
            }
        }
        public static function AddCandidates() {
            //fetching data from api.
            try{
                $name = Flight::request()->data->name;
                $description = Flight::request()->data->description;
                $party = Flight::request()->data->party;
                $electionname = Flight::request()->data->electionname;
                $category = Flight::request()->data->category;
                $vote = 0;
                $db = Flight::db();
                //save data to the database.
                $sql = "INSERT INTO candidates (name, description, party,vote, electionname, category) VALUES (?,?,?,?,?,?)";
                $stmt= $db->prepare($sql);
                $stmt->execute([$name, $description, $party, $vote, $electionname, $category]);
                Flight::json(array('status' => true,'reason' => 'sucess'));
            } catch(PDOException $e){
                // error
                Flight::json(array('status' => false,'reason' =>"error :". $e->getMessage()));
            }
        }
        public static function ListCandidates(){
            $electionname = Flight::request()->data->electionname;
            $category = Flight::request()->data->category;
            $db = Flight::db();
            try{
                // check login
                $sql = "SELECT * FROM candidates WHERE electionname =:electionname AND category =:category";
                $stmt= $db->prepare($sql);
                $stmt ->bindParam(':electionname',$electionname);
                $stmt ->bindParam(':category',$category);
                $stmt->execute();
                $data = $stmt->fetchAll();
                Flight::json($data);
            } catch(PDOException $e){
                // error
                Flight::json(array('status' => false,'reason' =>"error :". $e->getMessage()));
            }
        }
        public static function C_voter() {
            //fetching data from api.
            $name = Flight::request()->data->name;
            $email = Flight::request()->data->email;
            $dob = Flight::request()->data->dob;
            $password = Flight::request()->data->password;
            $boothname = Flight::request()->data->boothname;
            $vote = 0;

            $db = Flight::db();
            //save data to the database.
            $sql = "INSERT INTO voter (boothname, name, dob, email, password, vote) VALUES (?,?,?,?,?,?)";
            $stmt= $db->prepare($sql);
            $stmt->execute([$boothname, $name, $dob, $email, $password, $vote]);
            $result = $stmt->errorInfo();
            Flight::json(array('status' => true,'reason' => 'sucess','result' => $result));
        }
        public static function voterLogin(){
            $email = Flight::request()->data->email;
            $password = Flight::request()->data->password;
            $db = Flight::db();
            try{
                // check login
                $sql = "SELECT * FROM voter WHERE email =:email AND password =:password";
                $stmt= $db->prepare($sql);
                $stmt ->bindParam(':email',$email);
                $stmt ->bindParam(':password',$password);
                $stmt->execute();
                $data = $stmt->fetch();

                if( $stmt->rowCount() != 0){
                    Flight::json(array('status' => true,'reason' => $email, 'data :' => $data));
                }else{
                    Flight::json(array('status' => false,'reason' => 'no user Found'));
                }
            } catch(PDOException $e){
                // error
                Flight::json(array('status' => false,'reason' =>"error :". $e->getMessage()));
            }
        }
        public static function vote() {
            //fetching data from api.
            $db = Flight::db();
            $id = Flight::request()->data->id;

                $sql = "SELECT vote FROM candidates WHERE id =:id";
                $stmt= $db->prepare($sql);
                $stmt ->bindParam(':id',$id);
                $stmt->execute();
                $vote = $stmt->fetchColumn();
                
                $sql = "UPDATE candidates SET vote=$vote+1 WHERE id = $id";
                $stmt= $db->prepare($sql);
                $stmt->execute();
                $result = $stmt->errorInfo();
                Flight::json(array('status' => true,'data :' => $result));
        }
        public static function markVote(){
            $db = Flight::db();
            $email = Flight::request()->data->email;
                
                $sql = "UPDATE voter SET vote=1 WHERE email =:email";
                $stmt= $db->prepare($sql);
                $stmt ->bindParam(':email',$email);
                $stmt->execute();
                $result = $stmt->errorInfo();
                Flight::json(array('status' => true,'data :' => $result));
        }
        public static function checkVote(){
            $email = Flight::request()->data->email;
            $db = Flight::db();
            try{
                // check login
                $sql = "SELECT vote FROM voter WHERE email =:email";
                $stmt= $db->prepare($sql);
                $stmt ->bindParam(':email',$email);
                $stmt->execute();
                $vote = $stmt->fetchColumn();
                Flight::json($vote);
            } catch(PDOException $e){
                // error
                Flight::json(array('status' => false,'reason' =>"error :". $e->getMessage()));
            }
        }
        public static function deleteElection(){
            $electionname = Flight::request()->data->electionname;
            $boothname = Flight::request()->data->boothname;
            $db = Flight::db();
            try{
                // check login
                $sql = "DELETE FROM election WHERE electionname =:electionname";
                $stmt= $db->prepare($sql);
                $stmt ->bindParam(':electionname',$electionname);
                $stmt->execute();
                $result = $stmt->errorInfo();
                Flight::json(array('status' => true,'data :' => $result));

                $sql = "DELETE FROM candidates WHERE electionname =:electionname";
                $stmt= $db->prepare($sql);
                $stmt ->bindParam(':electionname',$electionname);
                $stmt->execute();
                $result = $stmt->errorInfo();
                Flight::json(array('status' => true,'data :' => $result));

                $sql = "UPDATE voter SET vote=0 WHERE boothname =:boothname";
                $stmt= $db->prepare($sql);
                $stmt ->bindParam(':boothname',$boothname);
                $stmt->execute();
                $result = $stmt->errorInfo();
                Flight::json(array('status' => true,'data :' => $result));
                Flight::json("finished");
            } catch(PDOException $e){
                // error
                Flight::json(array('status' => false,'reason' =>"error :". $e->getMessage()));
            }
        }
    }

    Flight::route('POST /newBooth', array('Booth','Create'));//Create new Booth.
    Flight::route('POST /AdminLogin', array('Booth','Login'));//login as Admin
    Flight::route('POST /admin', array('Booth','admin'));
    Flight::route('POST /election', array('Booth','Election'));//Create an election.
    Flight::route('POST /ListElection', array('Booth','ElectionList'));//List Election.
    Flight::route('POST /AddCandidates', array('Booth','AddCandidates'));//Add Candidates.
    Flight::route('POST /ListCandidates', array('Booth','ListCandidates'));//List Election.
    Flight::route('POST /Cvoter', array('Booth','C_voter'));//Register Voter.
    Flight::route('POST /voterLogin', array('Booth','voterLogin'));//login as Voter
    Flight::route('POST /vote', array('Booth','vote'));//Mark Vote
    Flight::route('POST /markVote', array('Booth','markVote'));//complete Vote
    Flight::route('POST /checkVote', array('Booth','checkVote'));//check Vote
    Flight::route('POST /deleteElection', array('Booth','deleteElection'));//delete Election
    Flight::route('POST /adminData', array('Booth','adminData'));//admin data

    Flight::start();
?>