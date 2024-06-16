<script lang="ts" setup>
import { UserButton, SignedIn, OrganizationSwitcher } from 'vue-clerk'
</script>

<template>
  <SignedIn>
    <div class="block sm:hidden">
      <OrganizationSwitcher
        after-create-organization-url="/dashboard"
        :appearance="{
          elements: {
            organizationSwitcherTriggerIcon: `hidden`,
            organizationPreviewTextContainer: `hidden`,
            organizationSwitcherTrigger: `pr-0`,
          },
        }"
      />
    </div>
    <UserButton after-sign-out-url="/" />
  </SignedIn>
</template>

<script setup></script>
