#!/usr/bin/env node

/**
 * TS-VersionLib CLI Tool
 * A convenient command-line interface for generating version numbers
 * 
 * Usage:
 *   node version-cli.js [version-type]
 *   
 * Version types:
 *   dev      - Development version (default)
 *   beta     - Beta release version  
 *   release  - Production release version
 * 
 * Examples:
 *   node version-cli.js          # Generates dev version
 *   node version-cli.js dev      # Generates dev version
 *   node version-cli.js beta     # Generates beta version
 *   node version-cli.js release  # Generates release version
 */

const path = require('path');
const { generateBuildVersion, updatePackageVersion, createVersionFile } = require('./generate-version.js');

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

function colorize(text, color) {
  return `${colors[color]}${text}${colors.reset}`;
}

function showHelp() {
  console.log(colorize('TS-VersionLib CLI Tool', 'cyan'));
  console.log(colorize('========================', 'cyan'));
  console.log('');
  console.log('A convenient command-line interface for generating version numbers');
  console.log('');
  console.log(colorize('Usage:', 'yellow'));
  console.log('  node version-cli.js [version-type]');
  console.log('');
  console.log(colorize('Version Types:', 'yellow'));
  console.log('  dev      - Development version (default)');
  console.log('  beta     - Beta release version');
  console.log('  release  - Production release version');
  console.log('');
  console.log(colorize('Examples:', 'yellow'));
  console.log('  node version-cli.js          # Generates dev version');
  console.log('  node version-cli.js dev      # Generates dev version');
  console.log('  node version-cli.js beta     # Generates beta version');
  console.log('  node version-cli.js release  # Generates release version');
  console.log('');
  console.log(colorize('Options:', 'yellow'));
  console.log('  --help, -h    Show this help message');
  console.log('  --version, -v Show version information');
}

function showVersion() {
  console.log(colorize('TS-VersionLib CLI', 'cyan'));
  console.log('Version: 1.0.0');
  console.log('A TypeScript/JavaScript versioning library');
}

function validateVersionType(versionType) {
  const validTypes = ['dev', 'beta', 'release'];
  return validTypes.includes(versionType);
}

function main() {
  const args = process.argv.slice(2);
  
  // Handle help flags
  if (args.includes('--help') || args.includes('-h')) {
    showHelp();
    return;
  }
  
  // Handle version flags
  if (args.includes('--version') || args.includes('-v')) {
    showVersion();
    return;
  }
  
  // Get version type from arguments
  let versionType = args[0] || 'dev';
  
  // Validate version type
  if (!validateVersionType(versionType)) {
    console.error(colorize('Error:', 'red'), `Invalid version type "${versionType}"`);
    console.error('Valid types are: dev, beta, release');
    console.error('Use --help for more information');
    process.exit(1);
  }
  
  try {
    console.log(colorize('TS-VersionLib CLI', 'cyan'));
    console.log(colorize('===================', 'cyan'));
    console.log('');
    console.log(colorize('Generating version...', 'yellow'));
    console.log(`Version type: ${colorize(versionType, 'magenta')}`);
    console.log('');

    // Generate the version
    const generatedVersion = generateBuildVersion(versionType);
    
    if (!generatedVersion) {
      throw new Error('Failed to generate version');
    }
    
    console.log(colorize('Version generated:', 'green'), colorize(generatedVersion, 'bright'));
    console.log('');
    
    // Update package.json (if it exists)
    console.log(colorize('Updating package.json...', 'yellow'));
    const packageUpdated = updatePackageVersion(generatedVersion);
    
    if (packageUpdated) {
      console.log(colorize('package.json updated successfully', 'green'));
    } else {
      console.log(colorize('package.json not found or failed to update', 'yellow'));
    }
    
    // Create version.ts file
    console.log(colorize('Creating version file...', 'yellow'));
    const versionFileCreated = createVersionFile(generatedVersion);
    
    if (versionFileCreated) {
      console.log(colorize('src/version.ts created/updated successfully', 'green'));
    } else {
      console.log(colorize('Failed to create version file', 'red'));
    }
    
    console.log('');
    console.log(colorize('Version generation completed!', 'green'));
    console.log(colorize('Final version:', 'cyan'), colorize(generatedVersion, 'bright'));
    
    // Also output the version for scripting purposes
    process.stdout.write('\n' + generatedVersion + '\n');
    
  } catch (error) {
    console.error('');
    console.error(colorize('Error:', 'red'), error.message);
    console.error('');
    console.error(colorize('Stack trace:', 'red'));
    console.error(error.stack);
    process.exit(1);
  }
}

// Export functions for potential use as a module
module.exports = {
  generateVersion: generateBuildVersion,
  updatePackage: updatePackageVersion,
  createVersionFile: createVersionFile,
  showHelp,
  showVersion
};

// Run the CLI if this file is executed directly
if (require.main === module) {
  main();
}
