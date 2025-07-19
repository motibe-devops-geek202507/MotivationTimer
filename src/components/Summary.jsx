import React, { useEffect, useRef } from 'react';
import '../assets/Summary.css';
import { useNavigate } from 'react-router-dom';

const Summary = ({ studyInfo }) => {
    const navigate = useNavigate();
    // canvas要素への参照を作成
    const canvasRef = useRef(null);

    // 副作用（DOM操作、イベントリスナーなど）を管理
    useEffect(() => {
        // canvasとコンテキストを取得
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');

        let confettiParticles = [];
        let animationFrameId;
        const confettiCount = 300;
        const colors = ['#000000', '#AAAAAA']; // 黒とライトグレー

        // 単一の紙吹雪パーティクルを表すクラス
        class Confetti {
            constructor(isInitial = true) {
                this.active = true;
                this.reset(isInitial);
            }

            reset(isInitial) {
                this.active = true;
                this.isFromLeft = Math.random() < 0.5;
                this.x = this.isFromLeft ? 5 : canvas.width - 5;
                this.y = canvas.height / 2;

                if (isInitial) {
                    this.y = Math.random() * canvas.height;
                }

                const angle = this.isFromLeft
                    ? (Math.random() * Math.PI - Math.PI / 2)
                    : (Math.random() * Math.PI + Math.PI / 2);

                const speed = Math.random() * 10 + 5;
                this.vx = Math.cos(angle) * speed;
                this.vy = Math.sin(angle) * speed;

                this.gravity = 0.12;
                this.drag = 0.98;

                this.size = Math.random() * 8 + 4;
                this.color = colors[Math.floor(Math.random() * colors.length)];
                this.angle = Math.random() * 360;
                this.spin = Math.random() < 0.5 ? -1 : 1;
            }

            update() {
                if (!this.active) return;
                this.x += this.vx;
                this.y += this.vy;
                this.vy += this.gravity;
                this.vx *= this.drag;
                this.angle += this.vx * 0.5 * this.spin;

                if (this.y > canvas.height + 20 || this.x < -20 || this.x > canvas.width + 20) {
                    this.active = false;
                }
            }

            draw() {
                if (!this.active) return;
                ctx.save();
                ctx.translate(this.x, this.y);
                ctx.rotate(this.angle * Math.PI / 180);
                ctx.fillStyle = this.color;
                ctx.globalAlpha = 0.8;
                ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
                ctx.restore();
            }
        }

        const initConfetti = () => {
            confettiParticles = [];
            for (let i = 0; i < confettiCount; i++) {
                confettiParticles.push(new Confetti(true));
            }
        };

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            // Headerの高さ（約64px）を除いた高さに設定
            canvas.height = window.innerHeight - 64;
        };
        
        const handleResize = () => {
            resizeCanvas();
            initConfetti();
        };

        // メインのアニメーションループ
        const animate = () => {
            ctx.fillStyle = 'rgba(255, 255, 255, 0.9)'; // 背景を白でクリア
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            if (Math.random() < 0.3) {
                const inactiveParticle = confettiParticles.find(p => !p.active);
                if (inactiveParticle) {
                    inactiveParticle.reset(false);
                }
            }

            for (const particle of confettiParticles) {
                particle.update();
                particle.draw();
            }

            animationFrameId = requestAnimationFrame(animate);
        };

        // 初期化とイベントリスナーの設定
        handleResize();
        animate();
        window.addEventListener('resize', handleResize);

        // コンポーネントがアンマウントされる際のクリーンアップ関数
        return () => {
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []); // 空の依存配列は、コンポーネントのマウント時に一度だけ実行されることを意味します

    return (
        <div className="summary-page">
            <div className="message-container">
                <div className="text-center">
                    <p>{studyInfo.subject}の学習が終了しました。</p>
                    <h1>お疲れ様でした</h1>
                    <button className="btn btn-dark btn-lg mt-3" onClick={() => navigate('/mypage')}>
                        Back to Home
                    </button>
                </div>
            </div>
            
            {/* refをcanvas要素に紐付ける */}
            <canvas id="confetti-canvas" ref={canvasRef}></canvas>
        </div>
    );
};

export default Summary;