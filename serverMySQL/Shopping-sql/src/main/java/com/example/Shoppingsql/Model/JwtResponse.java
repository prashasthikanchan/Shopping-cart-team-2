package com.example.Shoppingsql.Model;

public class JwtResponse {

  private String jwtToken;
  private String email;

  public String getJwtToken() {
    return jwtToken;
  }

  public void setJwtToken(String jwtToken) {
    this.jwtToken = jwtToken;
  }

  public String getEmail() {
    return email;
  }

  public void setUsername(String email) {
    this.email = email;
  }

  public static Builder builder() {
    return new Builder();
  }

  public static class Builder {

    private String jwtToken;
    private String email;

    public Builder jwtToken(String jwtToken) {
      this.jwtToken = jwtToken;
      return this;
    }

    public Builder email(String email) {
      this.email = email;
      return this;
    }

    public JwtResponse build() {
      JwtResponse response = new JwtResponse();
      response.jwtToken = this.jwtToken;
      response.email = this.email;
      return response;
    }
  }
}
