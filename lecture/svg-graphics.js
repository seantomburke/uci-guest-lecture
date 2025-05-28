// SVG.js Graphics for UCI Guest Lecture Presentation
// Cool animated graphics for each slide

class PresentationGraphics {
    constructor() {
        this.graphics = {};
        this.init();
    }

    init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.createGraphics());
        } else {
            this.createGraphics();
        }
    }

    createGraphics() {
        this.createRejectionAcceptanceViz();
        this.createNetworkVisualization();
        this.createSkillsRadarChart();
        this.createCareerPathAnimation();
        this.createTechStackIcons();
        this.createSuccessMetrics();
        this.createCompoundEffectViz();
        this.createInterviewTipsGraphic();
        this.createTimelineGraphic();
        this.createMotivationalQuoteGraphic();
        this.createInteractiveElements();
        this.createDynamicBackgrounds();
    }

    // Rejection vs Acceptance Visualization for journey-5 slide
    createRejectionAcceptanceViz() {
        const container = document.getElementById('rejection-acceptance-viz');
        if (!container) return;

        const draw = SVG().addTo(container).size(500, 400);
        
        // Background
        draw.rect(500, 400).fill('#1a1a2e').rx(10);
        
        // Title
        draw.text('The Journey to Success').move(250, 20).font({
            family: 'Arial, sans-serif',
            size: 18,
            anchor: 'middle',
            fill: '#ffffff'
        });

        // Create rejection bars (red)
        const rejections = [
            { company: 'Microsoft', x: 50, height: 80 },
            { company: 'Google', x: 100, height: 90 },
            { company: 'Facebook', x: 150, height: 75 },
            { company: 'SpaceX', x: 200, height: 85 },
            { company: 'Twitter', x: 250, height: 70 },
            { company: 'Others', x: 300, height: 95 }
        ];

        rejections.forEach((rejection, index) => {
            const bar = draw.rect(30, rejection.height)
                .move(rejection.x, 300 - rejection.height)
                .fill('#ff4757')
                .opacity(0);
            
            // Animate bars appearing
            bar.animate(500, index * 100).opacity(0.8);
            
            // Company labels
            draw.text(rejection.company)
                .move(rejection.x + 15, 310)
                .font({ size: 10, anchor: 'middle', fill: '#ffffff' })
                .rotate(-45);
        });

        // Success bar (green) - LinkedIn
        const successBar = draw.rect(40, 120)
            .move(380, 180)
            .fill('#2ed573')
            .opacity(0);
        
        successBar.animate(800, 1000).opacity(1);
        
        draw.text('LinkedIn ✓')
            .move(400, 310)
            .font({ size: 12, anchor: 'middle', fill: '#2ed573', weight: 'bold' });

        // Add sparkle effect around success bar
        for (let i = 0; i < 8; i++) {
            const star = draw.polygon('0,5 1.5,1.5 5,0 1.5,-1.5 0,-5 -1.5,-1.5 -5,0 -1.5,1.5')
                .move(370 + Math.random() * 80, 160 + Math.random() * 80)
                .fill('#ffd700')
                .opacity(0);
            
            star.animate(1000, 1500 + i * 200).opacity(1).scale(1.5).opacity(0);
        }

        // Motivational text
        draw.text('One "YES" is all you need!')
            .move(250, 350)
            .font({
                family: 'Arial, sans-serif',
                size: 16,
                anchor: 'middle',
                fill: '#2ed573',
                weight: 'bold'
            });

        this.graphics.rejectionViz = draw;
    }

    // Network Visualization for networks slides
    createNetworkVisualization() {
        // Find network-related slides and add graphics
        const networkSlides = ['networks-1', 'networks-2', 'networks-3'];
        
        networkSlides.forEach((slideId, index) => {
            const slide = document.getElementById(slideId);
            if (!slide) return;

            // Create a container for the network graphic
            const placeholder = slide.querySelector('.image-placeholder');
            if (!placeholder) return;

            placeholder.innerHTML = '';
            const draw = SVG().addTo(placeholder).size(400, 300);
            
            // Background
            draw.rect(400, 300).fill('#0f3460').rx(10);
            
            // Central node (You)
            const centerNode = draw.circle(40).move(180, 130).fill('#4a90e2');
            draw.text('YOU').move(200, 145).font({
                family: 'Arial, sans-serif',
                size: 12,
                anchor: 'middle',
                fill: '#ffffff',
                weight: 'bold'
            });

            // Connection nodes
            const connections = [
                { x: 100, y: 80, label: 'UCI Alumni', color: '#ff6b6b' },
                { x: 280, y: 70, label: 'Classmates', color: '#4ecdc4' },
                { x: 320, y: 150, label: 'Professors', color: '#45b7d1' },
                { x: 280, y: 230, label: 'Industry', color: '#96ceb4' },
                { x: 100, y: 220, label: 'Mentors', color: '#feca57' },
                { x: 60, y: 150, label: 'Friends', color: '#ff9ff3' }
            ];

            connections.forEach((conn, i) => {
                // Draw connection line
                const line = draw.line(200, 150, conn.x + 15, conn.y + 15)
                    .stroke({ color: '#ffffff', width: 2, opacity: 0.3 });
                
                // Animate line drawing
                line.animate(800, i * 200).stroke({ opacity: 0.6 });
                
                // Draw node
                const node = draw.circle(30).move(conn.x, conn.y).fill(conn.color).opacity(0);
                node.animate(500, i * 200 + 400).opacity(0.8);
                
                // Add label
                draw.text(conn.label).move(conn.x + 15, conn.y + 35).font({
                    family: 'Arial, sans-serif',
                    size: 10,
                    anchor: 'middle',
                    fill: '#ffffff'
                });
            });

            // Add pulsing effect to center node
            centerNode.animate(2000, 0, 'now').scale(1.2).scale(1).loop();
        });
    }

    // Skills Radar Chart for skills slides
    createSkillsRadarChart() {
        const skillsSlide = document.getElementById('skills-1');
        if (!skillsSlide) return;

        const placeholder = skillsSlide.querySelector('.image-placeholder');
        if (!placeholder) return;

        placeholder.innerHTML = '';
        const draw = SVG().addTo(placeholder).size(400, 300);
        
        // Background
        draw.rect(400, 300).fill('#2c2c54').rx(10);
        
        const centerX = 200;
        const centerY = 150;
        const radius = 100;
        
        // Skills data
        const skills = [
            { name: 'Technical', value: 0.9, angle: 0 },
            { name: 'Communication', value: 0.8, angle: 60 },
            { name: 'Leadership', value: 0.7, angle: 120 },
            { name: 'Problem Solving', value: 0.95, angle: 180 },
            { name: 'Teamwork', value: 0.85, angle: 240 },
            { name: 'Adaptability', value: 0.8, angle: 300 }
        ];

        // Draw radar grid
        for (let i = 1; i <= 5; i++) {
            const gridRadius = (radius * i) / 5;
            draw.circle(gridRadius * 2).move(centerX - gridRadius, centerY - gridRadius)
                .fill('none').stroke({ color: '#ffffff', width: 1, opacity: 0.2 });
        }

        // Draw skill areas and labels
        const points = [];
        skills.forEach((skill, index) => {
            const angle = (skill.angle * Math.PI) / 180;
            const skillRadius = radius * skill.value;
            const x = centerX + skillRadius * Math.cos(angle);
            const y = centerY + skillRadius * Math.sin(angle);
            
            points.push([x, y]);
            
            // Draw axis line
            draw.line(centerX, centerY, centerX + radius * Math.cos(angle), centerY + radius * Math.sin(angle))
                .stroke({ color: '#ffffff', width: 1, opacity: 0.3 });
            
            // Add skill point
            const point = draw.circle(8).move(x - 4, y - 4).fill('#4a90e2').opacity(0);
            point.animate(500, index * 100).opacity(1);
            
            // Add label
            const labelX = centerX + (radius + 20) * Math.cos(angle);
            const labelY = centerY + (radius + 20) * Math.sin(angle);
            draw.text(skill.name).move(labelX, labelY).font({
                family: 'Arial, sans-serif',
                size: 10,
                anchor: 'middle',
                fill: '#ffffff'
            });
        });

        // Draw skill polygon
        const polygon = draw.polygon(points).fill('#4a90e2').opacity(0.3).stroke({ color: '#4a90e2', width: 2 });
        polygon.animate(1000, 600).opacity(0.5);
    }

    // Career Path Animation
    createCareerPathAnimation() {
        const pathSlide = document.getElementById('journey-1');
        if (!pathSlide) return;

        const placeholder = pathSlide.querySelector('.image-placeholder');
        if (!placeholder) return;

        placeholder.innerHTML = '';
        const draw = SVG().addTo(placeholder).size(400, 300);
        
        // Background
        draw.rect(400, 300).fill('#16213e').rx(10);
        
        // Career path steps
        const steps = [
            { x: 50, y: 250, label: 'UCI\nStudent', color: '#ff6b6b' },
            { x: 150, y: 200, label: 'UCSD\nGrad School', color: '#4ecdc4' },
            { x: 250, y: 150, label: 'LinkedIn\nEngineer', color: '#45b7d1' },
            { x: 350, y: 100, label: 'GoLinks\nFounder', color: '#96ceb4' }
        ];

        // Draw path
        const pathPoints = steps.map(step => [step.x + 20, step.y + 20]);
        const path = draw.polyline(pathPoints).fill('none').stroke({ color: '#ffd700', width: 3 });
        
        // Animate path drawing
        const pathLength = path.length();
        path.stroke({ dasharray: pathLength, dashoffset: pathLength });
        path.animate(2000).stroke({ dashoffset: 0 });

        // Add step nodes and labels
        steps.forEach((step, index) => {
            const node = draw.circle(40).move(step.x, step.y).fill(step.color).opacity(0);
            node.animate(500, index * 400 + 500).opacity(0.8);
            
            draw.text(step.label).move(step.x + 20, step.y + 50).font({
                family: 'Arial, sans-serif',
                size: 10,
                anchor: 'middle',
                fill: '#ffffff'
            });
        });

        // Add floating icons
        for (let i = 0; i < 10; i++) {
            const icon = draw.circle(5).move(Math.random() * 380, Math.random() * 280)
                .fill('#ffd700').opacity(0.3);
            
            icon.animate(3000 + Math.random() * 2000, 0, 'now')
                .move(Math.random() * 380, Math.random() * 280).loop();
        }
    }

    // Tech Stack Icons
    createTechStackIcons() {
        const techSlide = document.getElementById('tech-landscape-2');
        if (!techSlide) return;

        const placeholder = techSlide.querySelector('.image-placeholder');
        if (!placeholder) return;

        placeholder.innerHTML = '';
        const draw = SVG().addTo(placeholder).size(400, 300);
        
        // Background
        draw.rect(400, 300).fill('#0f0f23').rx(10);
        
        // Tech categories
        const techStacks = [
            { name: 'Frontend', x: 80, y: 80, color: '#61dafb', techs: ['React', 'Vue', 'Angular'] },
            { name: 'Backend', x: 320, y: 80, color: '#68d391', techs: ['Node.js', 'Python', 'Java'] },
            { name: 'Mobile', x: 80, y: 220, color: '#f093fb', techs: ['React Native', 'Flutter', 'Swift'] },
            { name: 'Cloud', x: 320, y: 220, color: '#4fd1c7', techs: ['AWS', 'Azure', 'GCP'] }
        ];

        techStacks.forEach((stack, index) => {
            // Main category circle
            const circle = draw.circle(60).move(stack.x - 30, stack.y - 30).fill(stack.color).opacity(0);
            circle.animate(600, index * 200).opacity(0.8);
            
            // Category label
            draw.text(stack.name).move(stack.x, stack.y + 40).font({
                family: 'Arial, sans-serif',
                size: 12,
                anchor: 'middle',
                fill: '#ffffff',
                weight: 'bold'
            });

            // Tech items orbiting around
            stack.techs.forEach((tech, techIndex) => {
                const angle = (techIndex * 120) * Math.PI / 180;
                const orbitRadius = 50;
                const techX = stack.x + orbitRadius * Math.cos(angle);
                const techY = stack.y + orbitRadius * Math.sin(angle);
                
                const techCircle = draw.circle(20).move(techX - 10, techY - 10)
                    .fill('#ffffff').opacity(0);
                
                techCircle.animate(400, index * 200 + techIndex * 100 + 300).opacity(0.9);
                
                draw.text(tech).move(techX, techY + 25).font({
                    family: 'Arial, sans-serif',
                    size: 8,
                    anchor: 'middle',
                    fill: '#ffffff'
                });
            });
        });

        // Add connecting lines
        draw.line(110, 110, 290, 110).stroke({ color: '#ffffff', width: 1, opacity: 0.3 });
        draw.line(110, 190, 290, 190).stroke({ color: '#ffffff', width: 1, opacity: 0.3 });
        draw.line(200, 50, 200, 250).stroke({ color: '#ffffff', width: 1, opacity: 0.3 });
    }

    // Success Metrics Dashboard
    createSuccessMetrics() {
        const container = document.getElementById('success-metrics-viz');
        if (!container) return;

        container.innerHTML = '';
        const draw = SVG().addTo(container).size(500, 300);
        
        // Background
        draw.rect(400, 300).fill('#1a1a2e').rx(10);
        
        // Title
        draw.text('Success Metrics').move(200, 20).font({
            family: 'Arial, sans-serif',
            size: 16,
            anchor: 'middle',
            fill: '#ffffff',
            weight: 'bold'
        });

        // Metrics data
        const metrics = [
            { label: 'Job Satisfaction', value: 85, x: 100, y: 80 },
            { label: 'Salary Growth', value: 120, x: 300, y: 80 },
            { label: 'Network Size', value: 200, x: 100, y: 180 },
            { label: 'Skills Acquired', value: 150, x: 300, y: 180 }
        ];

        metrics.forEach((metric, index) => {
            // Progress circle
            const radius = 30;
            const circumference = 2 * Math.PI * radius;
            const progress = (metric.value / 200) * circumference;
            
            // Background circle
            draw.circle(radius * 2).move(metric.x - radius, metric.y - radius)
                .fill('none').stroke({ color: '#333', width: 4 });
            
            // Progress circle
            const progressCircle = draw.circle(radius * 2).move(metric.x - radius, metric.y - radius)
                .fill('none').stroke({ color: '#4a90e2', width: 4 })
                .attr({ 'stroke-dasharray': circumference, 'stroke-dashoffset': circumference });
            
            progressCircle.animate(1000, index * 200).attr({ 'stroke-dashoffset': circumference - progress });
            
            // Value text
            draw.text(metric.value + '%').move(metric.x, metric.y).font({
                family: 'Arial, sans-serif',
                size: 12,
                anchor: 'middle',
                fill: '#ffffff',
                weight: 'bold'
            });
            
            // Label
            draw.text(metric.label).move(metric.x, metric.y + 50).font({
                family: 'Arial, sans-serif',
                size: 10,
                anchor: 'middle',
                fill: '#ffffff'
            });
        });
    }

    // Compound Effect Visualization
    createCompoundEffectViz() {
        const container = document.getElementById('compound-effect-viz');
        if (!container) return;

        container.innerHTML = '';
        const draw = SVG().addTo(container).size(500, 300);
        
        // Background
        draw.rect(500, 300).fill('#1a1a2e').rx(10);
        
        // Title
        draw.text('The Compound Effect of Small Actions').move(250, 20).font({
            family: 'Arial, sans-serif',
            size: 16,
            anchor: 'middle',
            fill: '#ffffff',
            weight: 'bold'
        });

        // Create exponential growth curve
        const points = [];
        for (let x = 0; x <= 400; x += 10) {
            const progress = x / 400;
            const y = 250 - (Math.pow(progress, 2) * 180); // Exponential curve
            points.push([x + 50, y]);
        }

        // Draw the curve
        const curve = draw.polyline(points).fill('none').stroke({ color: '#4a90e2', width: 3 });
        
        // Animate curve drawing
        const curveLength = curve.length();
        curve.stroke({ dasharray: curveLength, dashoffset: curveLength });
        curve.animate(3000).stroke({ dashoffset: 0 });

        // Add milestone markers
        const milestones = [
            { x: 100, label: 'Day 1\nStart', color: '#ff6b6b' },
            { x: 200, label: 'Month 1\nHabit', color: '#4ecdc4' },
            { x: 300, label: 'Year 1\nProgress', color: '#45b7d1' },
            { x: 400, label: 'Year 5\nSuccess', color: '#96ceb4' }
        ];

        milestones.forEach((milestone, index) => {
            const progress = (milestone.x - 50) / 400;
            const y = 250 - (Math.pow(progress, 2) * 180);
            
            // Milestone marker
            const marker = draw.circle(12).move(milestone.x - 6, y - 6)
                .fill(milestone.color).opacity(0);
            
            marker.animate(500, index * 600 + 1000).opacity(1);
            
            // Label
            draw.text(milestone.label).move(milestone.x, y + 20).font({
                family: 'Arial, sans-serif',
                size: 10,
                anchor: 'middle',
                fill: '#ffffff'
            });
        });

        // Add inspirational text
        draw.text('Small daily improvements = Extraordinary results').move(250, 270).font({
            family: 'Arial, sans-serif',
            size: 12,
            anchor: 'middle',
            fill: '#ffd700',
            style: 'italic'
        });
    }

    // Interview Tips Graphic
    createInterviewTipsGraphic() {
        const tipsSlide = document.getElementById('interview-tips');
        if (!tipsSlide) return;

        const placeholder = tipsSlide.querySelector('.image-placeholder');
        if (!placeholder) return;

        placeholder.innerHTML = '';
        const draw = SVG().addTo(placeholder).size(400, 300);
        
        // Background
        draw.rect(400, 300).fill('#2c3e50').rx(10);
        
        // Interview process steps
        const steps = [
            { icon: '📝', label: 'Prepare', x: 80, y: 100 },
            { icon: '💬', label: 'Practice', x: 200, y: 60 },
            { icon: '🎯', label: 'Focus', x: 320, y: 100 },
            { icon: '✨', label: 'Shine', x: 200, y: 180 }
        ];

        // Draw connecting lines
        for (let i = 0; i < steps.length; i++) {
            const current = steps[i];
            const next = steps[(i + 1) % steps.length];
            
            draw.line(current.x, current.y, next.x, next.y)
                .stroke({ color: '#3498db', width: 2, opacity: 0.5 });
        }

        steps.forEach((step, index) => {
            // Step circle
            const circle = draw.circle(50).move(step.x - 25, step.y - 25)
                .fill('#3498db').opacity(0);
            
            circle.animate(500, index * 200).opacity(0.8);
            
            // Icon (using text for simplicity)
            draw.text(step.icon).move(step.x, step.y).font({
                family: 'Arial, sans-serif',
                size: 20,
                anchor: 'middle'
            });
            
            // Label
            draw.text(step.label).move(step.x, step.y + 35).font({
                family: 'Arial, sans-serif',
                size: 12,
                anchor: 'middle',
                fill: '#ffffff',
                weight: 'bold'
            });
        });
    }

    // Timeline Graphic
    createTimelineGraphic() {
        const timelineSlide = document.getElementById('timeline');
        if (!timelineSlide) return;

        const placeholder = timelineSlide.querySelector('.image-placeholder');
        if (!placeholder) return;

        placeholder.innerHTML = '';
        const draw = SVG().addTo(placeholder).size(400, 300);
        
        // Background
        draw.rect(400, 300).fill('#34495e').rx(10);
        
        // Timeline events
        const events = [
            { year: '2018', event: 'UCI Graduation', x: 80 },
            { year: '2019', event: 'UCSD Masters', x: 160 },
            { year: '2020', event: 'LinkedIn', x: 240 },
            { year: '2023', event: 'GoLinks', x: 320 }
        ];

        // Main timeline line
        const timelineLine = draw.line(60, 150, 340, 150)
            .stroke({ color: '#e74c3c', width: 4 });
        
        // Animate timeline drawing
        const lineLength = timelineLine.length();
        timelineLine.stroke({ dasharray: lineLength, dashoffset: lineLength });
        timelineLine.animate(2000).stroke({ dashoffset: 0 });

        events.forEach((event, index) => {
            // Event marker
            const marker = draw.circle(20).move(event.x - 10, 140)
                .fill('#e74c3c').opacity(0);
            
            marker.animate(300, index * 400 + 500).opacity(1);
            
            // Year label
            draw.text(event.year).move(event.x, 120).font({
                family: 'Arial, sans-serif',
                size: 12,
                anchor: 'middle',
                fill: '#ffffff',
                weight: 'bold'
            });
            
            // Event label
            draw.text(event.event).move(event.x, 180).font({
                family: 'Arial, sans-serif',
                size: 10,
                anchor: 'middle',
                fill: '#ffffff'
            });
        });
    }

    // Motivational Quote Graphic
    createMotivationalQuoteGraphic() {
        const quoteSlide = document.getElementById('motivation');
        if (!quoteSlide) return;

        const placeholder = quoteSlide.querySelector('.image-placeholder');
        if (!placeholder) return;

        placeholder.innerHTML = '';
        const draw = SVG().addTo(placeholder).size(400, 300);
        
        // Background with gradient
        const gradient = draw.gradient('linear', function(add) {
            add.stop(0, '#667eea');
            add.stop(1, '#764ba2');
        });
        
        draw.rect(400, 300).fill(gradient).rx(10);
        
        // Decorative elements
        for (let i = 0; i < 20; i++) {
            const star = draw.circle(3).move(Math.random() * 400, Math.random() * 300)
                .fill('#ffffff').opacity(0.3);
            
            star.animate(2000 + Math.random() * 1000, 0, 'now')
                .opacity(0.8).opacity(0.3).loop();
        }
        
        // Quote text
        draw.text('"Your network is your net worth"').move(200, 120).font({
            family: 'Arial, sans-serif',
            size: 18,
            anchor: 'middle',
            fill: '#ffffff',
            weight: 'bold'
        });
        
        draw.text('- Porter Gale').move(200, 160).font({
            family: 'Arial, sans-serif',
            size: 14,
            anchor: 'middle',
            fill: '#ffffff',
            style: 'italic'
        });
        
        // Animated underline
        const underline = draw.line(100, 180, 300, 180)
            .stroke({ color: '#ffd700', width: 3, opacity: 0 });
        
        underline.animate(1000, 1000).opacity(1);
    }

    // Add floating particles to enhance visual appeal
    createFloatingParticles() {
        // Add subtle floating particles to the title slide
        const titleSlide = document.getElementById('title');
        if (titleSlide) {
            const particleContainer = document.createElement('div');
            particleContainer.style.position = 'absolute';
            particleContainer.style.top = '0';
            particleContainer.style.left = '0';
            particleContainer.style.width = '100%';
            particleContainer.style.height = '100%';
            particleContainer.style.pointerEvents = 'none';
            particleContainer.style.zIndex = '1';
            titleSlide.appendChild(particleContainer);

            const draw = SVG().addTo(particleContainer).size('100%', '100%');
            
            // Create floating tech icons
            const techIcons = ['💻', '🚀', '⚡', '🎯', '💡', '🔧', '📱', '🌟'];
            
            for (let i = 0; i < 15; i++) {
                const icon = techIcons[Math.floor(Math.random() * techIcons.length)];
                const x = Math.random() * window.innerWidth;
                const y = Math.random() * window.innerHeight;
                
                const particle = draw.text(icon).move(x, y).font({
                    size: 20 + Math.random() * 10,
                    opacity: 0.1 + Math.random() * 0.2
                });
                
                // Animate floating motion
                particle.animate(5000 + Math.random() * 3000, 0, 'now')
                    .move(x + (Math.random() - 0.5) * 200, y + (Math.random() - 0.5) * 200)
                    .loop(true, true);
            }
        }
    }

    // Add interactive hover effects
    createInteractiveElements() {
        // Add hover effects to slides
        const slides = document.querySelectorAll('.step');
        
        slides.forEach(slide => {
            const placeholders = slide.querySelectorAll('.image-placeholder');
            
            placeholders.forEach(placeholder => {
                // Add a subtle glow effect on hover
                placeholder.addEventListener('mouseenter', () => {
                    placeholder.style.transition = 'all 0.3s ease';
                    placeholder.style.boxShadow = '0 0 20px rgba(74, 144, 226, 0.3)';
                    placeholder.style.borderColor = 'rgba(74, 144, 226, 0.6)';
                });
                
                placeholder.addEventListener('mouseleave', () => {
                    placeholder.style.boxShadow = 'none';
                    placeholder.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                });
            });
        });

        // Add pulse effect to important elements
        const importantElements = document.querySelectorAll('.highlight, .quote');
        importantElements.forEach(element => {
            element.style.animation = 'subtle-pulse 3s ease-in-out infinite';
        });

        // Add CSS for the pulse animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes subtle-pulse {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.02); }
            }
            
            .image-placeholder {
                transition: all 0.3s ease;
            }
            
            .step {
                transition: all 0.5s ease;
            }
        `;
        document.head.appendChild(style);
    }

    // Add dynamic background patterns
    createDynamicBackgrounds() {
        const slides = document.querySelectorAll('.step');
        
        slides.forEach((slide, index) => {
            // Create subtle animated background patterns
            const bgContainer = document.createElement('div');
            bgContainer.style.position = 'absolute';
            bgContainer.style.top = '0';
            bgContainer.style.left = '0';
            bgContainer.style.width = '100%';
            bgContainer.style.height = '100%';
            bgContainer.style.pointerEvents = 'none';
            bgContainer.style.zIndex = '0';
            bgContainer.style.opacity = '0.05';
            
            slide.style.position = 'relative';
            slide.insertBefore(bgContainer, slide.firstChild);

            const draw = SVG().addTo(bgContainer).size('100%', '100%');
            
            // Create different patterns for different slide types
            const patternType = index % 4;
            
            switch (patternType) {
                case 0: // Geometric pattern
                    for (let i = 0; i < 20; i++) {
                        const size = 20 + Math.random() * 40;
                        const x = Math.random() * window.innerWidth;
                        const y = Math.random() * window.innerHeight;
                        
                        draw.rect(size, size)
                            .move(x, y)
                            .fill('#ffffff')
                            .opacity(0.1)
                            .rotate(Math.random() * 45);
                    }
                    break;
                    
                case 1: // Circles pattern
                    for (let i = 0; i < 15; i++) {
                        const radius = 10 + Math.random() * 30;
                        const x = Math.random() * window.innerWidth;
                        const y = Math.random() * window.innerHeight;
                        
                        draw.circle(radius * 2)
                            .move(x, y)
                            .fill('none')
                            .stroke({ color: '#ffffff', width: 1, opacity: 0.1 });
                    }
                    break;
                    
                case 2: // Lines pattern
                    for (let i = 0; i < 10; i++) {
                        const x1 = Math.random() * window.innerWidth;
                        const y1 = Math.random() * window.innerHeight;
                        const x2 = Math.random() * window.innerWidth;
                        const y2 = Math.random() * window.innerHeight;
                        
                        draw.line(x1, y1, x2, y2)
                            .stroke({ color: '#ffffff', width: 1, opacity: 0.1 });
                    }
                    break;
                    
                case 3: // Tech grid pattern
                    const gridSize = 50;
                    for (let x = 0; x < window.innerWidth; x += gridSize) {
                        for (let y = 0; y < window.innerHeight; y += gridSize) {
                            if (Math.random() > 0.8) {
                                draw.circle(4)
                                    .move(x, y)
                                    .fill('#ffffff')
                                    .opacity(0.1);
                            }
                        }
                    }
                    break;
            }
        });
    }
}

// Initialize graphics when page loads
new PresentationGraphics(); 