const express = require('express');
const 
/**
 * NOTE: 회원가입
 * email: 유효성 검사,
 * 휴대폰: 010xxxxxxxx,
 * 휴대폰 인증
 */

class Join {
  private POST_AUTH_JOIN = '/auth/join';
  private POST_AUTH_NUM = '/auth/';

  private POST_AUTH_JOIN = '/auth/join';
  private POST_AUTH_JOIN = '/auth/join';
  private POST_AUTH_JOIN = '/auth/join';
  constructor() { }
  


  // 문자인증번호 요청
  public getAuthNum: (phoneNum: number) => {
    if(phoneNum=== 0) return '재인증 하세요.'
    return '인증성공!!'
  }

  public 

  public getJoin: ({ email: string, phone: number, factorNum: number }) => {
    
    
  }


}
