// D3 Graphics for UCI Guest Lecture Presentation
// Author: Sean Burke

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function() {
    
    // 1. Success Mindset - From Rejection to Acceptance (Funnel Chart)
    function createRejectionToAcceptanceFunnel() {
        const container = d3.select('#rejection-acceptance-viz');
        if (container.empty()) return;
        
        const width = 700;
        const height = 500;
        const margin = {top: 20, right: 20, bottom: 40, left: 60};
        
        const svg = container.append('svg')
            .attr('width', width)
            .attr('height', height);
        
        const data = [
            {stage: 'Applications Sent', value: 100, color: '#ff6b6b'},
            {stage: 'Phone Screens', value: 25, color: '#ffa726'},
            {stage: 'Technical Interviews', value: 10, color: '#ffcc02'},
            {stage: 'Final Rounds', value: 3, color: '#66bb6a'},
            {stage: 'Offers Received', value: 1, color: '#42a5f5'}
        ];
        
        const xScale = d3.scaleLinear()
            .domain([0, 100])
            .range([margin.left, width - margin.right]);
        
        const yScale = d3.scaleBand()
            .domain(data.map(d => d.stage))
            .range([margin.top, height - margin.bottom])
            .padding(0.1);
        
        // Create bars
        svg.selectAll('.bar')
            .data(data)
            .enter()
            .append('rect')
            .attr('class', 'bar')
            .attr('x', margin.left)
            .attr('y', d => yScale(d.stage))
            .attr('width', 0)
            .attr('height', yScale.bandwidth())
            .attr('fill', d => d.color)
            .attr('rx', 5)
            .transition()
            .duration(1000)
            .delay((d, i) => i * 200)
            .attr('width', d => xScale(d.value) - margin.left);
        
        // Add labels
        svg.selectAll('.label')
            .data(data)
            .enter()
            .append('text')
            .attr('class', 'label')
            .attr('x', d => xScale(d.value) + 5)
            .attr('y', d => yScale(d.stage) + yScale.bandwidth() / 2)
            .attr('dy', '0.35em')
            .style('font-size', '12px')
            .style('fill', 'white')
            .text(d => `${d.value}%`)
            .style('opacity', 0)
            .transition()
            .duration(500)
            .delay((d, i) => i * 200 + 1000)
            .style('opacity', 1);
        
        // Add stage names
        svg.selectAll('.stage-name')
            .data(data)
            .enter()
            .append('text')
            .attr('class', 'stage-name')
            .attr('x', margin.left - 10)
            .attr('y', d => yScale(d.stage) + yScale.bandwidth() / 2)
            .attr('dy', '0.35em')
            .style('text-anchor', 'end')
            .style('font-size', '11px')
            .style('fill', 'white')
            .text(d => d.stage);
    }
    
    // 2. Relationship Building Timeline
    function createRelationshipTimeline() {
        const container = d3.select('#relationship-timeline-viz');
        if (container.empty()) return;
        
        const width = 500;
        const height = 300;
        const margin = {top: 20, right: 20, bottom: 40, left: 20};
        
        const svg = container.append('svg')
            .attr('width', width)
            .attr('height', height);
        
        const data = [
            {year: 'Freshman', connections: 5, description: 'Classmates'},
            {year: 'Sophomore', connections: 15, description: 'Study Groups'},
            {year: 'Junior', connections: 35, description: 'Internships'},
            {year: 'Senior', connections: 60, description: 'Career Fair'},
            {year: 'Post-Grad', connections: 150, description: 'Professional Network'}
        ];
        
        const xScale = d3.scaleBand()
            .domain(data.map(d => d.year))
            .range([margin.left, width - margin.right])
            .padding(0.1);
        
        const yScale = d3.scaleLinear()
            .domain([0, d3.max(data, d => d.connections)])
            .range([height - margin.bottom, margin.top]);
        
        // Create line
        const line = d3.line()
            .x(d => xScale(d.year) + xScale.bandwidth() / 2)
            .y(d => yScale(d.connections))
            .curve(d3.curveMonotoneX);
        
        const path = svg.append('path')
            .datum(data)
            .attr('fill', 'none')
            .attr('stroke', '#42a5f5')
            .attr('stroke-width', 3)
            .attr('d', line);
        
        // Animate line drawing
        const totalLength = path.node().getTotalLength();
        path
            .attr('stroke-dasharray', totalLength + ' ' + totalLength)
            .attr('stroke-dashoffset', totalLength)
            .transition()
            .duration(2000)
            .attr('stroke-dashoffset', 0);
        
        // Add circles
        svg.selectAll('.dot')
            .data(data)
            .enter()
            .append('circle')
            .attr('class', 'dot')
            .attr('cx', d => xScale(d.year) + xScale.bandwidth() / 2)
            .attr('cy', d => yScale(d.connections))
            .attr('r', 0)
            .attr('fill', '#42a5f5')
            .transition()
            .duration(500)
            .delay((d, i) => i * 400 + 1000)
            .attr('r', 6);
        
        // Add labels
        svg.selectAll('.year-label')
            .data(data)
            .enter()
            .append('text')
            .attr('class', 'year-label')
            .attr('x', d => xScale(d.year) + xScale.bandwidth() / 2)
            .attr('y', height - 5)
            .style('text-anchor', 'middle')
            .style('font-size', '10px')
            .style('fill', 'white')
            .text(d => d.year);
        
        // Add connection count labels
        svg.selectAll('.count-label')
            .data(data)
            .enter()
            .append('text')
            .attr('class', 'count-label')
            .attr('x', d => xScale(d.year) + xScale.bandwidth() / 2)
            .attr('y', d => yScale(d.connections) - 10)
            .style('text-anchor', 'middle')
            .style('font-size', '11px')
            .style('fill', 'white')
            .text(d => d.connections)
            .style('opacity', 0)
            .transition()
            .duration(500)
            .delay((d, i) => i * 400 + 1500)
            .style('opacity', 1);
    }
    
    // 3. Skills Assessment Matrix
    function createSkillsMatrix() {
        const container = d3.select('#skills-matrix-viz');
        if (container.empty()) return;
        
        const width = 500;
        const height = 400;
        const margin = {top: 40, right: 40, bottom: 60, left: 60};
        
        const svg = container.append('svg')
            .attr('width', width)
            .attr('height', height);
        
        const data = [
            {skill: 'Algorithms', technical: 85, soft: 30, category: 'core'},
            {skill: 'System Design', technical: 75, soft: 60, category: 'core'},
            {skill: 'Communication', technical: 20, soft: 90, category: 'soft'},
            {skill: 'Leadership', technical: 30, soft: 85, category: 'soft'},
            {skill: 'Frontend Dev', technical: 80, soft: 45, category: 'technical'},
            {skill: 'Backend Dev', technical: 85, soft: 40, category: 'technical'},
            {skill: 'Problem Solving', technical: 70, soft: 75, category: 'hybrid'},
            {skill: 'Teamwork', technical: 35, soft: 80, category: 'soft'}
        ];
        
        const xScale = d3.scaleLinear()
            .domain([0, 100])
            .range([margin.left, width - margin.right]);
        
        const yScale = d3.scaleLinear()
            .domain([0, 100])
            .range([height - margin.bottom, margin.top]);
        
        const colorScale = d3.scaleOrdinal()
            .domain(['core', 'technical', 'soft', 'hybrid'])
            .range(['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4']);
        
        // Add axes
        svg.append('g')
            .attr('transform', `translate(0,${height - margin.bottom})`)
            .call(d3.axisBottom(xScale))
            .append('text')
            .attr('x', width / 2)
            .attr('y', 40)
            .style('text-anchor', 'middle')
            .style('fill', 'white')
            .style('font-size', '12px')
            .text('Technical Skills');
        
        svg.append('g')
            .attr('transform', `translate(${margin.left},0)`)
            .call(d3.axisLeft(yScale))
            .append('text')
            .attr('transform', 'rotate(-90)')
            .attr('y', -40)
            .attr('x', -height / 2)
            .style('text-anchor', 'middle')
            .style('fill', 'white')
            .style('font-size', '12px')
            .text('Soft Skills');
        
        // Add circles
        svg.selectAll('.skill-circle')
            .data(data)
            .enter()
            .append('circle')
            .attr('class', 'skill-circle')
            .attr('cx', d => xScale(d.technical))
            .attr('cy', d => yScale(d.soft))
            .attr('r', 0)
            .attr('fill', d => colorScale(d.category))
            .attr('opacity', 0.7)
            .transition()
            .duration(1000)
            .delay((d, i) => i * 100)
            .attr('r', 8);
        
        // Add skill labels
        svg.selectAll('.skill-label')
            .data(data)
            .enter()
            .append('text')
            .attr('class', 'skill-label')
            .attr('x', d => xScale(d.technical))
            .attr('y', d => yScale(d.soft) - 12)
            .style('text-anchor', 'middle')
            .style('font-size', '9px')
            .style('fill', 'white')
            .text(d => d.skill)
            .style('opacity', 0)
            .transition()
            .duration(500)
            .delay((d, i) => i * 100 + 1000)
            .style('opacity', 1);
    }
    
    // 4. Engineering Manager Priorities Wheel
    function createPrioritiesWheel() {
        const container = d3.select('#priorities-wheel-viz');
        if (container.empty()) return;
        
        const width = 400;
        const height = 400;
        const radius = Math.min(width, height) / 2 - 20;
        
        const svg = container.append('svg')
            .attr('width', width)
            .attr('height', height);
        
        const g = svg.append('g')
            .attr('transform', `translate(${width/2},${height/2})`);
        
        const data = [
            {priority: 'Team Growth', value: 25, color: '#ff6b6b'},
            {priority: 'Code Quality', value: 20, color: '#4ecdc4'},
            {priority: 'Delivery Speed', value: 18, color: '#45b7d1'},
            {priority: 'Innovation', value: 15, color: '#96ceb4'},
            {priority: 'Process Improvement', value: 12, color: '#feca57'},
            {priority: 'Stakeholder Management', value: 10, color: '#ff9ff3'}
        ];
        
        const pie = d3.pie()
            .value(d => d.value)
            .sort(null);
        
        const arc = d3.arc()
            .innerRadius(radius * 0.4)
            .outerRadius(radius);
        
        const arcs = g.selectAll('.arc')
            .data(pie(data))
            .enter()
            .append('g')
            .attr('class', 'arc');
        
        arcs.append('path')
            .attr('d', arc)
            .attr('fill', d => d.data.color)
            .attr('opacity', 0.8)
            .transition()
            .duration(1000)
            .attrTween('d', function(d) {
                const interpolate = d3.interpolate({startAngle: 0, endAngle: 0}, d);
                return function(t) {
                    return arc(interpolate(t));
                };
            });
        
        // Add labels
        arcs.append('text')
            .attr('transform', d => `translate(${arc.centroid(d)})`)
            .attr('dy', '0.35em')
            .style('text-anchor', 'middle')
            .style('font-size', '10px')
            .style('fill', 'white')
            .text(d => d.data.priority)
            .style('opacity', 0)
            .transition()
            .duration(500)
            .delay(1000)
            .style('opacity', 1);
        
        // Add percentage labels
        arcs.append('text')
            .attr('transform', d => `translate(${arc.centroid(d)})`)
            .attr('dy', '1.5em')
            .style('text-anchor', 'middle')
            .style('font-size', '9px')
            .style('fill', 'white')
            .text(d => `${d.data.value}%`)
            .style('opacity', 0)
            .transition()
            .duration(500)
            .delay(1200)
            .style('opacity', 1);
    }
    
    // 5. Modern Tech Stack Evolution Timeline
    function createTechStackTimeline() {
        const container = d3.select('#tech-stack-timeline-viz');
        if (container.empty()) return;
        
        const width = 500;
        const height = 300;
        const margin = {top: 20, right: 20, bottom: 40, left: 20};
        
        const svg = container.append('svg')
            .attr('width', width)
            .attr('height', height);
        
        const data = [
            {year: '2010', stack: 'jQuery + PHP', popularity: 80},
            {year: '2015', stack: 'Angular + Node', popularity: 70},
            {year: '2018', stack: 'React + Express', popularity: 85},
            {year: '2021', stack: 'React + Next.js', popularity: 90},
            {year: '2024', stack: 'React + AI Tools', popularity: 95}
        ];
        
        const xScale = d3.scaleBand()
            .domain(data.map(d => d.year))
            .range([margin.left, width - margin.right])
            .padding(0.1);
        
        const yScale = d3.scaleLinear()
            .domain([0, 100])
            .range([height - margin.bottom, margin.top]);
        
        // Create bars
        svg.selectAll('.tech-bar')
            .data(data)
            .enter()
            .append('rect')
            .attr('class', 'tech-bar')
            .attr('x', d => xScale(d.year))
            .attr('y', height - margin.bottom)
            .attr('width', xScale.bandwidth())
            .attr('height', 0)
            .attr('fill', (d, i) => d3.interpolateViridis(i / (data.length - 1)))
            .attr('rx', 5)
            .transition()
            .duration(1000)
            .delay((d, i) => i * 200)
            .attr('y', d => yScale(d.popularity))
            .attr('height', d => height - margin.bottom - yScale(d.popularity));
        
        // Add year labels
        svg.selectAll('.year-label')
            .data(data)
            .enter()
            .append('text')
            .attr('class', 'year-label')
            .attr('x', d => xScale(d.year) + xScale.bandwidth() / 2)
            .attr('y', height - 5)
            .style('text-anchor', 'middle')
            .style('font-size', '10px')
            .style('fill', 'white')
            .text(d => d.year);
        
        // Add stack labels
        svg.selectAll('.stack-label')
            .data(data)
            .enter()
            .append('text')
            .attr('class', 'stack-label')
            .attr('x', d => xScale(d.year) + xScale.bandwidth() / 2)
            .attr('y', d => yScale(d.popularity) - 5)
            .style('text-anchor', 'middle')
            .style('font-size', '8px')
            .style('fill', 'white')
            .text(d => d.stack)
            .style('opacity', 0)
            .transition()
            .duration(500)
            .delay((d, i) => i * 200 + 1000)
            .style('opacity', 1);
    }
    
    // 6. Computer Science vs Coding Venn Diagram
    function createVennDiagram() {
        const container = d3.select('#venn-diagram-viz');
        if (container.empty()) return;
        
        const width = 400;
        const height = 300;
        
        const svg = container.append('svg')
            .attr('width', width)
            .attr('height', height);
        
        const centerX = width / 2;
        const centerY = height / 2;
        const radius = 80;
        
        // CS Circle
        svg.append('circle')
            .attr('cx', centerX - 40)
            .attr('cy', centerY)
            .attr('r', 0)
            .attr('fill', '#ff6b6b')
            .attr('opacity', 0.6)
            .transition()
            .duration(1000)
            .attr('r', radius);
        
        // Coding Circle
        svg.append('circle')
            .attr('cx', centerX + 40)
            .attr('cy', centerY)
            .attr('r', 0)
            .attr('fill', '#4ecdc4')
            .attr('opacity', 0.6)
            .transition()
            .duration(1000)
            .delay(500)
            .attr('r', radius);
        
        // Labels
        svg.append('text')
            .attr('x', centerX - 70)
            .attr('y', centerY - 100)
            .style('text-anchor', 'middle')
            .style('font-size', '12px')
            .style('fill', 'white')
            .style('font-weight', 'bold')
            .text('Computer Science')
            .style('opacity', 0)
            .transition()
            .duration(500)
            .delay(1000)
            .style('opacity', 1);
        
        svg.append('text')
            .attr('x', centerX + 70)
            .attr('y', centerY - 100)
            .style('text-anchor', 'middle')
            .style('font-size', '12px')
            .style('fill', 'white')
            .style('font-weight', 'bold')
            .text('Coding')
            .style('opacity', 0)
            .transition()
            .duration(500)
            .delay(1200)
            .style('opacity', 1);
        
        // CS-only items
        const csItems = ['Algorithms', 'Theory', 'Math'];
        csItems.forEach((item, i) => {
            svg.append('text')
                .attr('x', centerX - 70)
                .attr('y', centerY - 20 + i * 15)
                .style('text-anchor', 'middle')
                .style('font-size', '9px')
                .style('fill', 'white')
                .text(item)
                .style('opacity', 0)
                .transition()
                .duration(300)
                .delay(1400 + i * 100)
                .style('opacity', 1);
        });
        
        // Coding-only items
        const codingItems = ['Syntax', 'Frameworks', 'Tools'];
        codingItems.forEach((item, i) => {
            svg.append('text')
                .attr('x', centerX + 70)
                .attr('y', centerY - 20 + i * 15)
                .style('text-anchor', 'middle')
                .style('font-size', '9px')
                .style('fill', 'white')
                .text(item)
                .style('opacity', 0)
                .transition()
                .duration(300)
                .delay(1700 + i * 100)
                .style('opacity', 1);
        });
        
        // Intersection items
        const intersectionItems = ['Problem', 'Solving'];
        intersectionItems.forEach((item, i) => {
            svg.append('text')
                .attr('x', centerX)
                .attr('y', centerY - 5 + i * 15)
                .style('text-anchor', 'middle')
                .style('font-size', '9px')
                .style('fill', 'white')
                .style('font-weight', 'bold')
                .text(item)
                .style('opacity', 0)
                .transition()
                .duration(300)
                .delay(2000 + i * 100)
                .style('opacity', 1);
        });
    }
    
    // 7. Success Metrics Dashboard
    function createSuccessMetricsDashboard() {
        const container = d3.select('#success-metrics-viz');
        if (container.empty()) return;
        
        const width = 500;
        const height = 300;
        
        const svg = container.append('svg')
            .attr('width', width)
            .attr('height', height);
        
        const metrics = [
            {name: 'Impact', value: 75, color: '#ff6b6b'},
            {name: 'Growth', value: 85, color: '#4ecdc4'},
            {name: 'Relationships', value: 90, color: '#45b7d1'},
            {name: 'Value Creation', value: 70, color: '#96ceb4'}
        ];
        
        const gaugeWidth = 100;
        const gaugeHeight = 80;
        const cols = 2;
        const rows = 2;
        
        metrics.forEach((metric, i) => {
            const x = (i % cols) * (gaugeWidth + 50) + 50;
            const y = Math.floor(i / cols) * (gaugeHeight + 80) + 50;
            
            const g = svg.append('g')
                .attr('transform', `translate(${x}, ${y})`);
            
            // Background arc
            const arc = d3.arc()
                .innerRadius(25)
                .outerRadius(35)
                .startAngle(-Math.PI / 2)
                .endAngle(Math.PI / 2);
            
            g.append('path')
                .attr('d', arc)
                .attr('fill', '#333')
                .attr('opacity', 0.3);
            
            // Value arc
            const valueArc = d3.arc()
                .innerRadius(25)
                .outerRadius(35)
                .startAngle(-Math.PI / 2)
                .endAngle(-Math.PI / 2);
            
            const valuePath = g.append('path')
                .attr('d', valueArc)
                .attr('fill', metric.color);
            
            // Animate the arc
            valuePath.transition()
                .duration(1500)
                .delay(i * 300)
                .attrTween('d', function() {
                    const interpolate = d3.interpolate(-Math.PI / 2, -Math.PI / 2 + (metric.value / 100) * Math.PI);
                    return function(t) {
                        const endAngle = interpolate(t);
                        return d3.arc()
                            .innerRadius(25)
                            .outerRadius(35)
                            .startAngle(-Math.PI / 2)
                            .endAngle(endAngle)();
                    };
                });
            
            // Add metric name
            g.append('text')
                .attr('y', 55)
                .style('text-anchor', 'middle')
                .style('font-size', '11px')
                .style('fill', 'white')
                .style('font-weight', 'bold')
                .text(metric.name);
            
            // Add percentage
            g.append('text')
                .attr('y', 5)
                .style('text-anchor', 'middle')
                .style('font-size', '14px')
                .style('fill', 'white')
                .style('font-weight', 'bold')
                .text('0%')
                .transition()
                .duration(1500)
                .delay(i * 300)
                .tween('text', function() {
                    const interpolate = d3.interpolate(0, metric.value);
                    return function(t) {
                        this.textContent = Math.round(interpolate(t)) + '%';
                    };
                });
        });
    }
    
    // 8. Learning Community Network Visualization
    function createNetworkVisualization() {
        const container = d3.select('#network-viz');
        if (container.empty()) return;
        
        const width = 500;
        const height = 400;
        
        const svg = container.append('svg')
            .attr('width', width)
            .attr('height', height);
        
        const nodes = [
            {id: 'You', group: 'center', x: width/2, y: height/2},
            {id: 'Classmates', group: 'peers'},
            {id: 'Professors', group: 'mentors'},
            {id: 'Industry', group: 'professional'},
            {id: 'Alumni', group: 'professional'},
            {id: 'Online Community', group: 'digital'},
            {id: 'Study Groups', group: 'peers'},
            {id: 'Hackathons', group: 'events'},
            {id: 'Conferences', group: 'events'}
        ];
        
        const links = [
            {source: 'You', target: 'Classmates'},
            {source: 'You', target: 'Professors'},
            {source: 'You', target: 'Industry'},
            {source: 'You', target: 'Alumni'},
            {source: 'You', target: 'Online Community'},
            {source: 'Classmates', target: 'Study Groups'},
            {source: 'Industry', target: 'Hackathons'},
            {source: 'Alumni', target: 'Conferences'},
            {source: 'Professors', target: 'Industry'}
        ];
        
        const colorScale = d3.scaleOrdinal()
            .domain(['center', 'peers', 'mentors', 'professional', 'digital', 'events'])
            .range(['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3']);
        
        const simulation = d3.forceSimulation(nodes)
            .force('link', d3.forceLink(links).id(d => d.id).distance(80))
            .force('charge', d3.forceManyBody().strength(-300))
            .force('center', d3.forceCenter(width / 2, height / 2));
        
        // Add links
        const link = svg.append('g')
            .selectAll('line')
            .data(links)
            .enter()
            .append('line')
            .attr('stroke', '#999')
            .attr('stroke-opacity', 0.6)
            .attr('stroke-width', 2);
        
        // Add nodes
        const node = svg.append('g')
            .selectAll('circle')
            .data(nodes)
            .enter()
            .append('circle')
            .attr('r', d => d.group === 'center' ? 12 : 8)
            .attr('fill', d => colorScale(d.group))
            .attr('opacity', 0)
            .transition()
            .duration(1000)
            .delay((d, i) => i * 100)
            .attr('opacity', 0.8);
        
        // Add labels
        const labels = svg.append('g')
            .selectAll('text')
            .data(nodes)
            .enter()
            .append('text')
            .text(d => d.id)
            .style('font-size', '10px')
            .style('fill', 'white')
            .style('text-anchor', 'middle')
            .attr('dy', '0.35em')
            .style('opacity', 0)
            .transition()
            .duration(500)
            .delay(1000)
            .style('opacity', 1);
        
        simulation.on('tick', () => {
            link
                .attr('x1', d => d.source.x)
                .attr('y1', d => d.source.y)
                .attr('x2', d => d.target.x)
                .attr('y2', d => d.target.y);
            
            node
                .attr('cx', d => d.x)
                .attr('cy', d => d.y);
            
            labels
                .attr('x', d => d.x)
                .attr('y', d => d.y);
        });
    }
    
    // 9. Time Compound Effect
    function createCompoundEffectChart() {
        const container = d3.select('#compound-effect-viz');
        if (container.empty()) return;
        
        const width = 500;
        const height = 300;
        const margin = {top: 20, right: 20, bottom: 40, left: 60};
        
        const svg = container.append('svg')
            .attr('width', width)
            .attr('height', height);
        
        const earlyData = [];
        const lateData = [];
        
        for (let year = 0; year <= 10; year++) {
            earlyData.push({
                year: year,
                value: Math.pow(1.2, year) * 100
            });
            lateData.push({
                year: year,
                value: year <= 5 ? 100 : Math.pow(1.2, year - 5) * 100
            });
        }
        
        const xScale = d3.scaleLinear()
            .domain([0, 10])
            .range([margin.left, width - margin.right]);
        
        const yScale = d3.scaleLinear()
            .domain([0, d3.max(earlyData, d => d.value)])
            .range([height - margin.bottom, margin.top]);
        
        const line = d3.line()
            .x(d => xScale(d.year))
            .y(d => yScale(d.value))
            .curve(d3.curveMonotoneX);
        
        // Add axes
        svg.append('g')
            .attr('transform', `translate(0,${height - margin.bottom})`)
            .call(d3.axisBottom(xScale))
            .append('text')
            .attr('x', width / 2)
            .attr('y', 35)
            .style('text-anchor', 'middle')
            .style('fill', 'white')
            .style('font-size', '12px')
            .text('Years');
        
        svg.append('g')
            .attr('transform', `translate(${margin.left},0)`)
            .call(d3.axisLeft(yScale))
            .append('text')
            .attr('transform', 'rotate(-90)')
            .attr('y', -40)
            .attr('x', -height / 2)
            .style('text-anchor', 'middle')
            .style('fill', 'white')
            .style('font-size', '12px')
            .text('Career Value');
        
        // Early start line
        const earlyPath = svg.append('path')
            .datum(earlyData)
            .attr('fill', 'none')
            .attr('stroke', '#4ecdc4')
            .attr('stroke-width', 3)
            .attr('d', line);
        
        // Late start line
        const latePath = svg.append('path')
            .datum(lateData)
            .attr('fill', 'none')
            .attr('stroke', '#ff6b6b')
            .attr('stroke-width', 3)
            .attr('d', line);
        
        // Animate lines
        [earlyPath, latePath].forEach((path, i) => {
            const totalLength = path.node().getTotalLength();
            path
                .attr('stroke-dasharray', totalLength + ' ' + totalLength)
                .attr('stroke-dashoffset', totalLength)
                .transition()
                .duration(2000)
                .delay(i * 1000)
                .attr('stroke-dashoffset', 0);
        });
        
        // Add legend
        const legend = svg.append('g')
            .attr('transform', `translate(${width - 150}, 40)`);
        
        legend.append('line')
            .attr('x1', 0)
            .attr('x2', 20)
            .attr('stroke', '#4ecdc4')
            .attr('stroke-width', 3);
        
        legend.append('text')
            .attr('x', 25)
            .attr('y', 5)
            .style('font-size', '11px')
            .style('fill', 'white')
            .text('Start Early');
        
        legend.append('line')
            .attr('x1', 0)
            .attr('x2', 20)
            .attr('y', 20)
            .attr('stroke', '#ff6b6b')
            .attr('stroke-width', 3);
        
        legend.append('text')
            .attr('x', 25)
            .attr('y', 25)
            .style('font-size', '11px')
            .style('fill', 'white')
            .text('Start Late');
    }
    
    // Initialize all visualizations when DOM is ready
    setTimeout(() => {
        createRejectionToAcceptanceFunnel();
        createRelationshipTimeline();
        createSkillsMatrix();
        createPrioritiesWheel();
        createTechStackTimeline();
        createVennDiagram();
        createSuccessMetricsDashboard();
        createNetworkVisualization();
        createCompoundEffectChart();
    }, 1000);
}); 