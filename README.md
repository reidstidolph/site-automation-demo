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

### Template IDs

In your demo org, you'll need to create a set of RF and WAN templates and gather their IDs. `sites.json` has the following IDs in the site settings:

```
{
  "kiosk" : {
    "rftemplate_id": "b38c87aa-ddec-4b42-b30c-1eac65722489",
    "gatewaytemplate_id": "f1a9b9b8-2639-4911-9b5e-fb1dadfda66a"
  },
  "small-branch" : {
    "rftemplate_id": "ed6d6a6c-4189-41b2-99ba-157b0bb567d5",
    "gatewaytemplate_id": "6a55c651-9712-4235-9d5c-94a70e717db9"
  },
  "large-branch": {
    "rftemplate_id": "96275985-b16f-4072-9803-b085b0a0bf74",
    "gatewaytemplate_id": "da283cdb-732d-4c56-a2ea-fe031fc2db5f"
  },
  "datacenter": {
    "gatewaytemplate_id": "bcddf1fd-3c42-4ac0-98c3-11dda6116664"
  }
}
```

If using a different org, with different template IDs, you will need to find/replace these to match your target org.

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