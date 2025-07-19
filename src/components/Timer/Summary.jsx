import React from 'react';

const Summary = ({ studyInfo }) => {
  return (
    <div className="text-center">
      <p>{studyInfo.subject}の学習が終了しました。</p>
      <h2>お疲れ様でした！</h2>
    </div>
  );
};

export default Summary;
