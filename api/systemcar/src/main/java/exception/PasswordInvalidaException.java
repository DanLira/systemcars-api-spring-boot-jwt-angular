package exception;

public class PasswordInvalidaException extends RuntimeException{
	
	public PasswordInvalidaException() {
        super("Invalid login or password");
    }
}
