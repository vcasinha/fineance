<?php
class AuthController extends BaseController {
    public function login()
    {
        // validate the info, create rules for the inputs
        $rules = array(
            'email'    => 'required|email', // make sure the email is an actual email
            'password' => 'required|alphaNum|min:3' // password can only be alphanumeric and has to be greater than 3 characters
        );

        $input = Input::json();
        // run the validation rules on the inputs from the form
        $validator = Validator::make($input->all(), $rules);

        // if the validator fails, redirect back to the form
        if ($validator->fails()) {
            throw new Exception('validation.failed');
       } else {

            // create our user data for the authentication
            $userdata = array(
                'email'     => $input->get('email'),
                'password'  => $input->get('password')
            );

            // attempt to do the login
            if (Auth::attempt($userdata, true)) {
                return "IT WORKED";
            } else {        
                throw new Exception('authentication.failed');
            }

        }
    }

    public function check()
    {
        if(Auth::check())
        {
            return "Authenticated";
        }
        else
        {
            return "Guest";
        }
    }

    public function logout()
    {
        Auth::logout();
    }
}