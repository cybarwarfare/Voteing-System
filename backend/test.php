<?php
    require 'vendor/autoload.php';
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');
   
    //databse connection.
    Flight::register('db', 'PDO', array('mysql:host=localhost;dbname=vote','root',''));

    //CREATE BOOTH
    class Booth {
        public static function Create() {
            //fetching data from api.
            $email = Flight::request()->data->email;
            $password = Flight::request()->data->password;
            $boothname = Flight::request()->data->boothname;
            $collage = Flight::request()->data->collage;
            $db = Flight::db();
            echo "email :".$email." Password :".$password ."boothname :".$boothname. "collage :" . $collage;
            //save data to the database.
            $sql = "INSERT INTO admin (boothname, email, password, collage) VALUES (?,?,?,?)";
            $stmt= $db->prepare($sql);
            $stmt->execute([$boothname, $email, $password, $collage]);
            Flight::json(array('status' => true,'reason' => 'sucess', 'email' => $email));
        }

        public static function Election() {
            //fetching data from api.
            $electionname = Flight::request()->data->electionname;
            $boothname = Flight::request()->data->boothname;
            $date = Flight::request()->data->date;
            $db = Flight::db();
            echo "email :".$electionname." Password :".$boothname ."boothname :".$date;
            //save data to the database.
            $sql = "INSERT INTO admin (electionname, boothname, date) VALUES (?,?,?)";
            $stmt= $db->prepare($sql);
            $stmt->execute([$electionname, $boothname, $date]);
            Flight::json(array('status' => true,'reason' => 'sucess'));
        }

        public static function Candidate() {
            //fetching data from api.
            $name = Flight::request()->data->name;
            $description = Flight::request()->data->description;
            $party = Flight::request()->data->party;
            $vote = Flight::request()->data->vote;
            $electionname  = Flight::request()->data->electionname ;
            $category  = Flight::request()->data->category ;
            $db = Flight::db();
            echo "name :".$name." description :".$description ."party :".$party ."vote :".$vote."electionname  :".$electionname."category  :".$category;
            //save data to the database.
            $sql = "INSERT INTO admin (name, description, party, vote, electionname, category) VALUES (?,?,?,?,?,?)";
            $stmt= $db->prepare($sql);
            $stmt->execute([$name, $description, $party, $vote, $electionname, $category]);
            Flight::json(array('status' => true,'reason' => 'sucess'));
        }
    }
    class Voter{
        public static function newVoter(){
            //fetching data from api.
            $name = Flight::request()->data->name;
            $dob = Flight::request()->data->dob;
            $voter_id = Flight::request()->data->voter_id;
            $email = Flight::request()->data->email;
            $password  = Flight::request()->data->password ;
            $vote  = Flight::request()->data->vote ;
            $db = Flight::db();
            echo "name :".$name." dob :".$dob ."voter_id :".$voter_id ."email :".$email."password  :".$password."vote  :".$vote;
            //save data to the database.
            $sql = "INSERT INTO admin (name, dob, voter_id, email, password, vote) VALUES (?,?,?,?,?,?)";
            $stmt= $db->prepare($sql);
            $stmt->execute([$name, $dob, $voter_id, $email, $password, $vote]);
            Flight::json(array('status' => true,'reason' => 'sucess'));
        }
    }


    Flight::route('POST /newBooth', array('Booth','Create'));//Create new Booth.
    Flight::route('POST /update', array('Booth','aa'));//Create an election.
    Flight::route('POST /Candidate', array('Booth','Candidate'));//Add new Candidate.
    Flight::route('POST /VoterSignUp', array('Voter','newVoter'));//Add new Candidate.

    Flight::start();
?>