# Mist Site Automation Demo

This contains a set of automation scripts for the creation of 6,000 sites in a Mist org for demo purposes.

## Installation and Setup

### Module Install

Make sure you have NodeJS installed on your machine running this script. Install required modules by running:
```
npm install
```

### Auth Token

You will need 2 Mist API tokens with access to the target demo org.

In your working directory, create a JSON file called `token.json`, and copy the token key text into it. JSON needs to look like:
```
{
  "token1": "TxLu...long...token...string...FSW2",
  "token2": "OzX...long...token...string...9Fpb"
}
```

### Orgs

In your working directory, create a JSON file called `orgs.json`. In the JSON, create properties for the following:
- `importOrg`: OrgID you want to import sites to.
- `cleanupOrg`: OrgID you want to delete sites from (likely the same as `importOrg`)

Example:
```
{
  "importOrg" : "987c1ca9-0134-4984-bb8f-588c7c9b1bdf",
  "cleanupOrg" : "987c1ca9-0134-4984-bb8f-588c7c9b1bdf"
}
```

## Usage

With your modules installed, and token and orgs JSON set up, you are ready to go!

### Import Sites

To import sites from `sites.json` into `importOrg`:
```
node create-sites.js
```

### Cleanup Sites

To delete all sites except the default "Primary Site" from `cleanupOrg`:
```
node cleanup-sites.js
```