import React from 'react';

const Summary = ({ studyInfo }) => {
  return (
    <div className="text-center">
      <h2>お疲れ様でした！</h2>
      <p>Studied: {studyInfo.subject}</p>
      {/* 将来的に経過時間や記録など追加 */}
    </div>
  );
};

export default Summary;
