export const githubConfig = {
    username: "sanketsingh01",
    apiUrl: "https://github-contributions-api.deno.dev",

    // Display settings 
    title: 'GitHub Activity',
    subtitle: 'GitHub Contributions',

    // chart settings
    blockSize: 11,
    blockMargin: 3,
    fontSize: 12,
    maxLevel: 4,

    // Month Labels
    months: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
    ],

    // weekday labels
    weekdays: ['', 'M', '', 'W', '', 'F', ''],

    // Total count lable template
    totalCountLabel: `{{count}} contributions in the last year`,

    // Theme configurations for dark and light modes
    theme: {
        dark: [
            'rgb(22, 27, 34)', // Very dark for no contributions
            'rgb(14, 68, 41)', // Dark green
            'rgb(0, 109, 50)', // Medium green
            'rgb(38, 166, 65)', // Bright green
            'rgb(57, 211, 83)', // Very bright green
        ],
        light: [
            'rgb(235, 237, 240)', // Light gray
            'rgb(155, 233, 168)', // Light green
            'rgb(64, 196, 99)', // Medium green
            'rgb(48, 161, 78)', // Dark green
            'rgb(33, 110, 57)', // Very dark green
        ],
    },

    // Error state configuration 
    errorState: {
        title: 'Unable to load github contributions',
        description: 'Check out my profile direclty for the latest activity',
        buttonText: 'View on GitHub'
    },

    // Loading state configuration
    loadingState: {
        title: 'Loading contributions...',
        description: 'Fetching your GitHub activity data',
    },
}