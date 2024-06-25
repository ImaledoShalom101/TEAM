<br>

> [!NOTE]
> Incomplete codebase. Codebase has been privatized.

<br><br><br>

# TEAM

## Project Overview

### PROJECT STATUS

**Ongoing**

### Project Name

**TEAM** <sub>_...the digital medium for organisations._</sub>

### Brief Description

TEAM is an app designed to make operations, ideations, and
inner distributions of an organization seamless, effortless and highly productive.

Administration of any organisation can create an org account in TEAM app, and simply upload
email addresses of members to give them sign in permission. Various features are in TEAM app
to highly optimize the organisation's efficiency, and serve as an "ease medium" between admin
and members.

<br>

## Technical Overview

### Tech Stack

#### Programming Languages

Javascript

#### Frameworks

-   React Native
-   Expo

#### Libraries

-   React Native Paper
-   Date-fns
-   Luxon
-   React Native Async Storage
-   [ ] Firebase
-   [ ] Redux Toolkit
-   More...

### System Design

-   **Scalability**
    -   has potential for large number of users.
    -   _Backend work still in progress_
-   **Performance**
    -   impressive UX still being optimized.
    -   strictly on non-expensive actions.
    -   consistent use of React hooks.
-   **Security**
    -   use of Expo security tools.
    -   checks between rendering of components.
-   **Maintainability**
    -   well-structured files.
    -   standard compartmentalization.

<br>

## Functionality Highlights

> [!NOTE]
> I am NOT a UI designer. :grin: I'm also not a big fan of Loren Ipsum. 🥲

### Key Features

Some of the most ~~challenging~~ interesting features I made include:

1. **The Home Screen itself**

Due to how this screen had to have components that presented a little bit of eveeything in other
screens, it was nearly a pain in the neck for optimization. With the use of hooks like `useMemo`,
however, optimization was achieved and is still being improved.

The interface highlighted `Red` is the component controlled by the App's owner to distribute
brief surveys for improvement of TEAM App.

The interface highlighted `Green` is a component that displays status of a member (of Hary
organisation, in this case) using animations of `react-native-animated-numbers`.

<img src="/assets/READMEAssets/home-shot-1.jpg" alt="Home screen 1 of TEAM App" width="250" />
<br>

The time count interface highlighted `Deep Blue` is a component using `date-fns` for logic.
It was tricky to implement (as is every other internationally synchronous counter). The
component shows the countdown till its larent component expires for members of organisation.

The interface highlighted `Deep Purple` is a component that displays whichever date its parent component
is uploaded.

<img src="/assets/READMEAssets/home-shot-2.jpg" alt="Home screen 2 of TEAM App" width="250" />
<br>

2. **Tasks Screen**

I named this one "Lord of Expenses".

This screen shows tasks given by admin ('management' in TEAM App) to members, with slightly
different components for admin's and members' interface.

<img src="/assets/READMEAssets/tasks-shot.png" alt="Home screen 2 of TEAM App" width="250" />
<br>

3. **Members Screen**

This screen displays for only management.  
It contains information of all signed in members of organisation for recording and status check.

<img src="/assets/READMEAssets/members-shot.png" alt="Home screen 2 of TEAM App" width="250" />
<br>

4. **Activities Screen**

This screen was particularly interesting to create because of its child components' UI, which had to
be manually constructed.

<img src="/assets/READMEAssets/activities-shot.png" alt="Home screen 2 of TEAM App" width="250" />
<br>

5. **Congratulations Screen**

This is my favorite screen yet, and I don't even know why.  
This screen displays when members win "Impacts" or "Badges". Read more [about impacts and
badges](/READMEForUsers.md).

<img src="/assets/READMEAssets/congratulations-shot.png" alt="congratulations screen of TEAM App" width="250" />

### More Screenshots

<img src="/assets/collate-shots/collated-1.jpg" alt="congratulations screen of TEAM App" width="250" /> $~$
<img src="/assets/collate-shots/collated-2.jpg" alt="congratulations screen of TEAM App" width="250" />

<img src="/assets/collate-shots/collated-3.jpg" alt="congratulations screen of TEAM App" width="250" />

<br>

## Advanced Features

### Optional Features

### Configurational Options

<br>

## License

### License Information

This incomplete codebase, and the project as a whole, is subject to license,
and completely restricts use, plagiarism, and any other actions which break its
copyright. [Read through the license](/LICENSE) by clicking here.

<br>

## Contact

**Reach out to me on** :v:

-   [**Whatsapp**](https://wa.me/+2349137287950) :yellow_heart:
-   [**LinkedIn**](https://www.linkedin.com/in/imaledo-david-2594b3258?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app) :white_heart:

<br>

## Product Documentation

Check out the [product documentation](/READMEForUsers.md) containing the detailed user guide
, along with FAQs, for TEAM App. Thanks for reading. :hugs:
