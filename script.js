        /* ── Tab switching ── */
        function switchTab(tab) {
            const isLogin = tab === 'login';

            document.getElementById('tab-login').classList.toggle('active', isLogin);
            document.getElementById('tab-login').classList.toggle('inactive', !isLogin);
            document.getElementById('tab-login').setAttribute('aria-selected', isLogin);

            document.getElementById('tab-signup').classList.toggle('active', !isLogin);
            document.getElementById('tab-signup').classList.toggle('inactive', isLogin);
            document.getElementById('tab-signup').setAttribute('aria-selected', !isLogin);

            document.getElementById('panel-login').classList.toggle('visible', isLogin);
            document.getElementById('panel-signup').classList.toggle('visible', !isLogin);
        }

        /* ── Login: OTP ↔ Password ── */
        function switchLoginMethod(method) {
            const isPw = method === 'password';

            document.getElementById('login-pw-btn').classList.toggle('active', isPw);
            document.getElementById('login-pw-btn').setAttribute('aria-pressed', isPw);
            document.getElementById('login-otp-btn').classList.toggle('active', !isPw);
            document.getElementById('login-otp-btn').setAttribute('aria-pressed', !isPw);

            document.getElementById('login-pw-field').style.display = isPw ? 'block' : 'none';
            document.getElementById('login-otp-field').style.display = !isPw ? 'block' : 'none';

            document.getElementById('login-aux-link').textContent =
                isPw ? 'Forgot Your Password?' : 'Get OTP ?';
        }

        /* ── Signup: OTP ↔ Password ── */
        function switchSignupMethod(method) {
            const isOtp = method === 'otp';

            document.getElementById('signup-otp-btn').classList.toggle('active', isOtp);
            document.getElementById('signup-otp-btn').setAttribute('aria-pressed', isOtp);
            document.getElementById('signup-pw-btn').classList.toggle('active', !isOtp);
            document.getElementById('signup-pw-btn').setAttribute('aria-pressed', !isOtp);

            document.getElementById('signup-otp-field').style.display = isOtp ? 'block' : 'none';
            document.getElementById('signup-pw-field').style.display = !isOtp ? 'block' : 'none';

            document.getElementById('signup-aux-link').textContent =
                isOtp ? 'Get OTP ?' : 'Forgot Your Password?';
        }

        /* ── Password show/hide ── */
        function togglePw(inputId, btn) {
            const input = document.getElementById(inputId);
            const showing = input.type === 'text';
            input.type = showing ? 'password' : 'text';
            btn.setAttribute('aria-label', showing ? 'Show password' : 'Hide password');

            const line = btn.querySelector('line');
            if (!showing) {
                if (!line) {
                    const svg = btn.querySelector('svg');
                    const l = document.createElementNS('http://www.w3.org/2000/svg', 'line');
                    l.setAttribute('x1', '3'); l.setAttribute('y1', '3');
                    l.setAttribute('x2', '21'); l.setAttribute('y2', '21');
                    l.setAttribute('stroke-linecap', 'round');
                    svg.appendChild(l);
                }
            } else {
                if (line) line.remove();
            }
        }

        /* ── Get OTP mock ── */
        function handleGetOtp(e) {
            e.preventDefault();
            const email = document.getElementById('signup-email').value.trim();
            if (!email) {
                alert('Please enter your email address first.');
                document.getElementById('signup-email').focus();
                return;
            }
            const link = document.getElementById('signup-aux-link');
            link.textContent = 'OTP sent!';
            link.style.color = '#28a745';
            setTimeout(() => {
                link.textContent = 'Get OTP ?';
                link.style.color = '';
            }, 3000);
        }

        /* ── Form handlers ── */
        function handleLogin(e) {
            e.preventDefault();
            const email = document.getElementById('login-email').value.trim();
            if (!email) { alert('Email is required.'); return; }
            alert(`Logging in as ${email}…`);
        }

        function handleSignup(e) {
            e.preventDefault();
            const email = document.getElementById('signup-email').value.trim();
            const captcha = document.getElementById('recaptcha-check').checked;
            if (!email) { alert('Email is required.'); return; }
            if (!captcha) { alert('Please complete the CAPTCHA.'); return; }
            alert(`Registering ${email}…`);
        }

        /* Boot state: Sign Up tab active */
        switchTab('signup');