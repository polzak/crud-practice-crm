module.exports = {
  'port': process.env.PORT || 8080,
  'database': 'mongodb://127.0.0.1/crm',
  'secret': 'secret'//jwt token을 암호화하기 위해 붙이는 암호 키.
  											//발급자가 원하는 단어로 비밀 키를 만들면 된다.
  											//이 비밀 키 덕분에, token을 복제하기 어렵다.

};
