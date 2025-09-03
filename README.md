# TS Version Lib
A TypeScript/JavaScript versioning library that generates build versions based on current date and git commit count.

## Features

- 🚀 **Automatic Version Generation**: Creates semantic versions based on date and git commits
- 📅 **Date-based Versioning**: Format: `YY.MM.DD-type.N` (e.g., `25.09.03-dev.1`)
- 🔄 **Multiple Release Types**: Support for dev, beta, and release versions
- 📦 **Package.json Integration**: Automatically updates your package.json version
- 📄 **TypeScript Support**: Generates TypeScript version files with build info
- 🎯 **CLI Interface**: Easy-to-use command-line tool
- 🛠️ **npm Scripts**: Convenient npm script shortcuts

## Installation

### Global Installation (Recommended for CLI usage)
```bash
npm install -g ts-version-lib
```

After global installation, you can use the `ts-version` or `version-gen` commands from anywhere:
```bash
ts-version dev
ts-version beta
ts-version release
```

### Local Installation (For project-specific usage)
```bash
npm install ts-version-lib
```

With local installation, use `npx` to run the CLI:
```bash
npx ts-version dev
npx ts-version beta
npx ts-version release
```

### Development Installation
```bash
npm install --save-dev ts-version-lib
```

## CLI Commands

After installation, you have access to these commands:

### Primary Commands
- `ts-version` - Main CLI command
- `version-gen` - Alternative CLI command (same functionality)

### Command Usage
```bash
# Generate development version (default)
ts-version
ts-version dev

# Generate beta version
ts-version beta

# Generate release version  
ts-version release

# Show help
ts-version --help
ts-version -h

# Show version info
ts-version --version
ts-version -v
```

### Using with npx (local installation)
```bash
npx ts-version dev
npx ts-version beta
npx ts-version release
npx ts-version --help
```

## Quick Start

### Using the CLI Tool (Recommended)

After installation, you can use the CLI tool with simple commands:

#### Global Installation Usage
```bash
# Generate a development version
ts-version
# or
ts-version dev

# Generate a beta version
ts-version beta

# Generate a release version
ts-version release

# Show help
ts-version --help
```

#### Local Installation Usage
```bash
# Generate versions using npx
npx ts-version dev
npx ts-version beta
npx ts-version release

# Show help
npx ts-version --help
```

#### Alternative Commands
You can also use the `version-gen` command as an alternative:
```bash
version-gen dev
version-gen beta
version-gen release
```

### Using npm Scripts

If you have the package.json in your project, you can use these convenient scripts:

```bash
# Generate different version types
npm run version:dev
npm run version:beta
npm run version:release

# Show help
npm run help
```

### Using as a Module

You can also use TS-VersionLib programmatically in your JavaScript/TypeScript code:

```javascript
const { generateBuildVersion, updatePackageVersion, createVersionFile } = require('ts-version-lib');

// Generate a version string
const version = generateBuildVersion('dev');
console.log(version); // e.g., "25.09.03-dev.1"

// Update package.json
updatePackageVersion(version);

// Create TypeScript version file
createVersionFile(version);
```

### Direct File Usage (Advanced)

If you need to use the files directly (for development or custom integration):

```bash
# Direct execution of the CLI
node version-cli.js dev
node version-cli.js beta
node version-cli.js release

# Direct execution of the core module
node generate-version.js dev
```

## Version Format

Versions follow this format: `YY.MM.DD-type.N`

- **YY**: Last two digits of the current year
- **MM**: Current month (01-12)
- **DD**: Current day (01-31)
- **type**: Version type (`dev`, `beta`, or `release`)
- **N**: Number of git commits made today (starts from 1)

### Examples
- `25.09.03-dev.1` - First development build on September 3rd, 2025
- `25.09.03-beta.3` - Third beta build on September 3rd, 2025
- `25.09.03-release.1` - First release build on September 3rd, 2025

## Generated Files

TS-VersionLib creates/updates these files:

### 1. package.json
Updates the `version` field with the generated version.

### 2. src/version.ts
Creates a TypeScript file with build information:

```typescript
export const BUILD_VERSION = '25.09.03-dev.1';
export const BUILD_DATE = '2025-09-03T10:30:00.000Z';
export const BUILD_TIMESTAMP = 1725360600000;
export const BUILD_INFO = {
  version: BUILD_VERSION,
  date: BUILD_DATE,
  timestamp: BUILD_TIMESTAMP,
};

// Helper functions
export const getBuildDateString = (): string => {
  return new Date(BUILD_TIMESTAMP).toLocaleDateString();
};

export const getVersionDisplayString = (): string => {
  return `v${BUILD_VERSION}`.split('-')[0];
};
```

## CLI Options

```bash
node version-cli.js [version-type] [options]
```

### Version Types
- `dev` - Development version (default)
- `beta` - Beta release version
- `release` - Production release version

### Options
- `--help`, `-h` - Show help message
- `--version`, `-v` - Show version information

## Requirements

- Node.js 12.0.0 or higher
- Git (optional, but recommended for commit counting)

## License

MIT License - see [LICENSE](LICENSE) file for details.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

