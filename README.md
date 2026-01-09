![SharpAPI GitHub cover](https://sharpapi.com/sharpapi-github-php-bg.jpg "SharpAPI Node.js Client")

# Related Job Positions Generator API for Node.js

## 💼 Generate related job positions with AI — powered by SharpAPI.

[![npm version](https://img.shields.io/npm/v/@sharpapi/sharpapi-node-related-job-positions.svg)](https://www.npmjs.com/package/@sharpapi/sharpapi-node-related-job-positions)
[![License](https://img.shields.io/npm/l/@sharpapi/sharpapi-node-related-job-positions.svg)](https://github.com/sharpapi/sharpapi-node-client/blob/master/LICENSE.md)

**SharpAPI Related Job Positions Generator** uses AI to generate a list of related job positions based on the provided position name. Perfect for HR tech, job boards, recruitment platforms, and career development tools.

---

## 📋 Table of Contents

1. [Requirements](#requirements)
2. [Installation](#installation)
3. [Usage](#usage)
4. [API Documentation](#api-documentation)
5. [Response Format](#response-format)
6. [Examples](#examples)
7. [License](#license)

---

## Requirements

- Node.js >= 16.x
- npm or yarn

---

## Installation

### Step 1. Install the package via npm:

```bash
npm install @sharpapi/sharpapi-node-related-job-positions
```

### Step 2. Get your API key

Visit [SharpAPI.com](https://sharpapi.com/) to get your API key.

---

## Usage

```javascript
const { SharpApiRelatedJobPositionsService } = require('@sharpapi/sharpapi-node-related-job-positions');

const apiKey = process.env.SHARP_API_KEY; // Store your API key in environment variables
const service = new SharpApiRelatedJobPositionsService(apiKey);

const jobPosition = 'Frontend Developer';

async function generateRelatedPositions() {
  try {
    // Submit related job positions generation job
    const statusUrl = await service.generateRelatedJobPositions(jobPosition, 'English', 10);
    console.log('Job submitted. Status URL:', statusUrl);

    // Fetch results (polls automatically until complete)
    const result = await service.fetchResults(statusUrl);
    console.log('Related positions:', result.getResultJson());
  } catch (error) {
    console.error('Error:', error.message);
  }
}

generateRelatedPositions();
```

---

## API Documentation

### Methods

#### `generateRelatedJobPositions(jobPositionName: string, language?: string, maxQuantity?: number, voiceTone?: string, context?: string): Promise<string>`

Generates a list of related job positions based on the provided position name.

**Parameters:**
- `jobPositionName` (string, required): The job position name to find related positions for
- `language` (string, optional): Output language (default: 'English')
- `maxQuantity` (number, optional): Maximum number of related positions to return (default: 10)
- `voiceTone` (string, optional): Tone of the response (e.g., 'Professional', 'Casual')
- `context` (string, optional): Additional context for the AI

**Returns:**
- Promise<string>: Status URL for polling the job result

**Example:**
```javascript
const statusUrl = await service.generateRelatedJobPositions(
  'Data Scientist',
  'English',
  8,
  'Professional',
  'Focus on senior-level positions in tech companies'
);
const result = await service.fetchResults(statusUrl);
```

---

## Response Format

The API returns related job positions with relevance scores (weight: 0-10, where 10 is the highest relevance):

```json
{
  "data": {
    "type": "api_job_result",
    "id": "80d0a822-0e2a-40e1-97fd-e7fd62ec9eb0",
    "attributes": {
      "status": "success",
      "type": "hr_related_job_positions",
      "result": {
        "job_position": "Flutter Mobile Developer",
        "related_job_positions": [
          {
            "name": "Android Developer",
            "weight": 8
          },
          {
            "name": "iOS Developer",
            "weight": 8.5
          },
          {
            "name": "Mobile App Developer",
            "weight": 9.5
          },
          {
            "name": "React Native Developer",
            "weight": 7.5
          },
          {
            "name": "Flutter Developer",
            "weight": 10
          },
          {
            "name": "Cross-Platform Mobile Developer",
            "weight": 7
          },
          {
            "name": "Mobile Software Engineer",
            "weight": 9
          },
          {
            "name": "App Developer",
            "weight": 7
          }
        ]
      }
    }
  }
}
```

**Weight Scale:**
- `10.0` - Exact match or extremely similar position
- `8.0-9.9` - Highly related (very similar responsibilities)
- `6.0-7.9` - Moderately related (overlapping skills and duties)
- `4.0-5.9` - Somewhat related (some transferable skills)
- `1.0-3.9` - Loosely related (adjacent career paths)

---

## Examples

### Basic Related Positions Generation

```javascript
const { SharpApiRelatedJobPositionsService } = require('@sharpapi/sharpapi-node-related-job-positions');

const service = new SharpApiRelatedJobPositionsService(process.env.SHARP_API_KEY);

service.generateRelatedJobPositions('DevOps Engineer', 'English', 6)
  .then(statusUrl => service.fetchResults(statusUrl))
  .then(result => {
    const data = result.getResultJson();
    console.log(`Related positions for ${data.result.job_position}:`);

    data.result.related_job_positions
      .sort((a, b) => b.weight - a.weight)
      .forEach((position, index) => {
        console.log(`${index + 1}. ${position.name} (relevance: ${position.weight}/10)`);
      });
  })
  .catch(error => console.error('Generation failed:', error));
```

### Job Recommendation System

```javascript
const service = new SharpApiRelatedJobPositionsService(process.env.SHARP_API_KEY);

async function recommendCareerPaths(currentPosition) {
  const statusUrl = await service.generateRelatedJobPositions(
    currentPosition,
    'English',
    15
  );

  const result = await service.fetchResults(statusUrl);
  const data = result.getResultJson();

  // Categorize by relevance
  const exactMatch = data.result.related_job_positions.filter(p => p.weight === 10);
  const highlyRelated = data.result.related_job_positions.filter(p => p.weight >= 8 && p.weight < 10);
  const related = data.result.related_job_positions.filter(p => p.weight >= 6 && p.weight < 8);

  return {
    current: currentPosition,
    exactMatches: exactMatch.map(p => p.name),
    lateralMoves: highlyRelated.map(p => p.name),
    careerPivots: related.map(p => p.name)
  };
}

const recommendations = await recommendCareerPaths('Product Manager');

console.log('Career Path Recommendations:');
console.log('\nLateral Moves (Similar Roles):');
recommendations.lateralMoves.forEach(job => console.log(`  - ${job}`));

console.log('\nCareer Pivot Options:');
recommendations.careerPivots.forEach(job => console.log(`  - ${job}`));
```

### Job Board Enhancement

```javascript
const service = new SharpApiRelatedJobPositionsService(process.env.SHARP_API_KEY);

async function expandJobSearch(userSearchTerm) {
  const statusUrl = await service.generateRelatedJobPositions(
    userSearchTerm,
    'English',
    20
  );

  const result = await service.fetchResults(statusUrl);
  const data = result.getResultJson();

  // Filter high-relevance positions for expanded search
  const expandedSearchTerms = data.result.related_job_positions
    .filter(position => position.weight >= 7)
    .map(position => position.name);

  return {
    original: userSearchTerm,
    expanded: [userSearchTerm, ...expandedSearchTerms],
    message: `Searching for ${expandedSearchTerms.length + 1} related positions`
  };
}

const expandedSearch = await expandJobSearch('Full Stack Developer');

console.log(expandedSearch.message);
console.log('Search terms:', expandedSearch.expanded.join(', '));
```

### Talent Pool Mapping

```javascript
const service = new SharpApiRelatedJobPositionsService(process.env.SHARP_API_KEY);

async function mapTalentPool(targetPosition) {
  const statusUrl = await service.generateRelatedJobPositions(
    targetPosition,
    'English',
    12
  );

  const result = await service.fetchResults(statusUrl);
  const data = result.getResultJson();

  // Identify candidates with transferable experience
  const transferablePositions = data.result.related_job_positions
    .filter(position => position.weight >= 6)
    .map(position => ({
      title: position.name,
      relevance: position.weight,
      trainingRequired: position.weight < 8 ? 'Moderate' : 'Minimal'
    }));

  return {
    targetRole: targetPosition,
    candidates: transferablePositions,
    totalPool: transferablePositions.length
  };
}

const talentMap = await mapTalentPool('Machine Learning Engineer');

console.log(`Talent Pool for ${talentMap.targetRole}:`);
console.log(`Total candidate sources: ${talentMap.totalPool}`);

talentMap.candidates.forEach(candidate => {
  console.log(`\n${candidate.title}`);
  console.log(`  Relevance: ${candidate.relevance}/10`);
  console.log(`  Training: ${candidate.trainingRequired}`);
});
```

---

## Use Cases

- **Job Recommendations**: Suggest related positions to job seekers
- **Career Pathing**: Guide professionals on potential career moves
- **Recruitment Expansion**: Broaden candidate search beyond exact title matches
- **Job Board Search**: Enhance search with related position suggestions
- **Internal Mobility**: Help HR identify lateral move opportunities
- **Talent Mapping**: Identify candidates with transferable experience
- **Job Description Writing**: Suggest alternative titles for positions

---

## API Endpoint

**POST** `/hr/related_job_positions`

For detailed API specifications, refer to:
- [Postman Documentation](https://documenter.getpostman.com/view/31106842/2sBXVeGsVT)
- [Product Page](https://sharpapi.com/en/catalog/ai/hr-tech/related-job-positions-generator)

---

## Related Packages

- [@sharpapi/sharpapi-node-related-skills](https://www.npmjs.com/package/@sharpapi/sharpapi-node-related-skills) - Related skills generator
- [@sharpapi/sharpapi-node-job-description](https://www.npmjs.com/package/@sharpapi/sharpapi-node-job-description) - Job descriptions
- [@sharpapi/sharpapi-node-parse-resume](https://www.npmjs.com/package/@sharpapi/sharpapi-node-parse-resume) - Resume parsing
- [@sharpapi/sharpapi-node-client](https://www.npmjs.com/package/@sharpapi/sharpapi-node-client) - Full SharpAPI SDK

---

## License

This project is licensed under the MIT License. See the [LICENSE.md](LICENSE.md) file for details.

---

## Support

- **Documentation**: [SharpAPI.com Documentation](https://sharpapi.com/documentation)
- **Issues**: [GitHub Issues](https://github.com/sharpapi/sharpapi-node-client/issues)
- **Email**: contact@sharpapi.com

---

**Powered by [SharpAPI](https://sharpapi.com/) - AI-Powered API Workflow Automation**
